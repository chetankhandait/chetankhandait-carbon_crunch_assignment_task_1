// Normalization logic
// Handles converting raw unreliable input into canonical format

function normalizeEvent(raw) {
    if (!raw || typeof raw !== 'object') {
        throw new Error("Invalid payload: must be an object");
    }

    // Heuristics for fields
    const source = raw.source || raw.client || raw.client_id || 'unknown_client';
    
    // Amount: try 'amount', 'value', 'cost'. Handle strings.
    let amount = 0;
    const rawAmount = raw.amount || raw.value || raw.cost || 0;
    const parsedAmount = parseFloat(rawAmount);
    if (!isNaN(parsedAmount)) {
        amount = parsedAmount;
    }

    // Metric: try 'metric', 'type', 'event_type'
    const metric = raw.metric || raw.type || raw.event_type || 'generic_event';

    // Timestamp: try 'timestamp', 'date', 'ts', 'time'
    // Default to now if invalid/missing
    let timestamp = new Date().toISOString(); 
    const rawTime = raw.timestamp || raw.date || raw.ts || raw.time;
    
    if (rawTime) {
        const dateObj = new Date(rawTime);
        if (!isNaN(dateObj.getTime())) {
            timestamp = dateObj.toISOString();
        }
    }

    return {
        client_id: String(source),
        metric: String(metric),
        amount: amount,
        timestamp: timestamp,
        _raw: raw // Keep raw for debugging if needed, though strictly we separate
    };
}

module.exports = { normalizeEvent };
