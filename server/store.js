// In-memory storage for the assignment
// In a real system, this would be Redis/Postgres

class Store {
    constructor() {
        this.processedEvents = [];
        this.processedHashes = new Set(); // For idempotency
        this.aggregatedStats = {
            totalEvents: 0,
            failedEvents: 0, // Events that failed processing/validation
            byClient: {},
        };
    }

    addEvent(event, hash) {
        this.processedEvents.push(event);
        this.processedHashes.add(hash);
        this.aggregatedStats.totalEvents++;
        
        const client = event.client_id || 'unknown';
        if (!this.aggregatedStats.byClient[client]) {
            this.aggregatedStats.byClient[client] = { count: 0, totalAmount: 0 };
        }
        this.aggregatedStats.byClient[client].count++;
        this.aggregatedStats.byClient[client].totalAmount += (event.amount || 0);
    }

    hasHash(hash) {
        return this.processedHashes.has(hash);
    }

    getStats() {
        return this.aggregatedStats;
    }
    
    getEvents() {
        return this.processedEvents;
    }
    
    reset() {
        this.processedEvents = [];
        this.processedHashes.clear();
        this.aggregatedStats = {
            totalEvents: 0,
            failedEvents: 0,
            byClient: {},
        };
    }
}

module.exports = new Store();
