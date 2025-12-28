const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ingestEvent } = require('./ingest');
const store = require('./store');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Ingestion Endpoint
app.post('/api/events', ingestEvent);

// Query/Stats Endpoint
app.get('/api/stats', (req, res) => {
    res.json(store.getStats());
});

// Debug Endpoint: Get all processed events
app.get('/api/events', (req, res) => {
    res.json(store.getEvents());
});

// Reset Endpoint (for demo purposes)
app.post('/api/reset', (req, res) => {
    store.reset();
    res.json({ status: "system reset" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
