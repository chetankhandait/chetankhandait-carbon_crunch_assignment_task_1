const crypto = require('crypto');
const store = require('./store');
const { normalizeEvent } = require('./normalizer');

function calculateHash(payload) {
    // Simple hash of stringified payload for deduplication
    // In production, might want better canonicalization (sort keys)
    return crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}

function ingestEvent(req, res) {
    const rawPayload = req.body;
    
    // 1. Simulate Failure if requested
    const simulateFailure = req.headers['x-simulate-failure'] === 'true';
    if (simulateFailure) {
        // Randomly fail 50% of the time
        if (Math.random() > 0.5) {
            console.warn("Simulated Failure Triggered");
            return res.status(500).json({ error: "Simulated Internal Server Error" });
        }
    }

    try {
        // 2. Validate basic structure
        if (!rawPayload) {
            return res.status(400).json({ error: "Missing payload" });
        }

        // 3. Deduplication
        // We hash the RAW payload to detect exact retries
        const hash = calculateHash(rawPayload);
        if (store.hasHash(hash)) {
            console.log("Duplicate event detected, ignoring:", hash);
            return res.status(200).json({ status: "ignored", reason: "duplicate" });
        }

        // 4. Normalization
        const normalized = normalizeEvent(rawPayload);

        // 5. "Database Write" (In-Memory)
        store.addEvent(normalized, hash);
        
        return res.status(200).json({ status: "success", data: normalized });

    } catch (err) {
        console.error("Processing error:", err);
        return res.status(400).json({ error: err.message });
    }
}

module.exports = { ingestEvent };
