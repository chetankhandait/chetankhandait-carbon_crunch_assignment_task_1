import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

const PRESETS = {
  clientA: { source: "client_A", payload: { metric: "value", amount: "1200", timestamp: "2024/01/01" } },
  clientB: { source: "client_B", type: "purchase", cost: 500, date: new Date().toISOString() },
  malformed: { source: "client_A", amount: "not_a_number" },
  duplicate: { source: "client_A", payload: { metric: "value", amount: "1200", timestamp: "2024/01/01" } } // Same as clientA
};

function App() {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(PRESETS.clientA, null, 2));
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    // Poll stats every 2 seconds
    const interval = setInterval(fetchStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  const handleSend = async () => {
    setLoading(true);
    let payload;
    try {
      payload = JSON.parse(jsonInput);
    } catch (e) {
      alert("Invalid JSON");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-simulate-failure': simulateFailure ? 'true' : 'false'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || res.statusText);
      }

      setEvents(prev => [{
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        status: data.status, // success or ignored
        reason: data.reason,
        payload: payload
      }, ...prev]);

    } catch (err) {
      setEvents(prev => [{
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        status: 'error',
        reason: err.message,
        payload: payload
      }, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    await fetch(`${API_URL}/reset`, { method: 'POST' });
    setEvents([]);
    fetchStats();
  };

  const loadPreset = (key) => {
    setJsonInput(JSON.stringify(PRESETS[key], null, 2));
  };

  return (
    <div>
      <h1>Event Ingestion System</h1>
      <button onClick={handleReset} style={{ background: '#b91c1c' }}>Reset System</button>
      
      <div className="row" style={{ marginTop: '2rem' }}>
        {/* Left Column: Input */}
        <div className="col">
          <div className="card">
            <h2>Ingest Event</h2>
            <div style={{ marginBottom: '1rem' }}>
              <button onClick={() => loadPreset('clientA')}>Client A</button>
              <button onClick={() => loadPreset('clientB')} style={{ marginLeft: '10px' }}>Client B</button>
              <button onClick={() => loadPreset('malformed')} style={{ marginLeft: '10px' }}>Malformed</button>
            </div>
            
            <textarea 
              value={jsonInput} 
              onChange={(e) => setJsonInput(e.target.value)}
            />

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={simulateFailure} 
                  onChange={(e) => setSimulateFailure(e.target.checked)} 
                />
                Simulate Server Failure (50% chance 500 Error)
              </label>
            </div>

            <button 
              onClick={handleSend} 
              style={{ marginTop: '1rem', width: '100%', background: '#2563eb' }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Event'}
            </button>
          </div>
        </div>

        {/* Right Column: Stats */}
        <div className="col">
          <div className="card">
            <h2>System Stats</h2>
            {stats ? (
              <div>
                <p><strong>Total Valid Events:</strong> {stats.totalEvents}</p>
                <p><strong>Failed/Invalid:</strong> {stats.failedEvents}</p>
                
                <h3>Aggregated by Client</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Client ID</th>
                            <th>Count</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(stats.byClient).map(([client, data]) => (
                            <tr key={client}>
                                <td>{client}</td>
                                <td>{data.count}</td>
                                <td>{data.totalAmount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            ) : <p>Loading stats...</p>}
          </div>
        </div>
      </div>

      {/* Bottom: Logs */}
      <div className="card">
        <h2>Event Log</h2>
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {events.map((e) => (
                    <tr key={e.id}>
                        <td>{e.time}</td>
                        <td className={e.status === 'success' ? 'success' : e.status === 'ignored' ? 'ignored' : 'error'}>
                            {e.status.toUpperCase()}
                        </td>
                        <td>
                            {e.reason ? e.reason : 'Processed'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
