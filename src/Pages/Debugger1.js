import React, { useState } from 'react';

const Debugger = () => {
  const [code, setCode] = useState('');
  const [debuggedCode, setDebuggedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const debugCode = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulate a debugging process
      const response = await fetch('https://api.example.com/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error('Debugging failed!');

      const result = await response.json();
      setDebuggedCode(result.debuggedCode);
    } catch (err) {
      setError('Failed to debug the code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Debugger Page</h2>
      <textarea
        value={code}
        onChange={handleCodeChange}
        placeholder="Paste your code here..."
        rows="10"
        cols="50"
      ></textarea>
      <button onClick={debugCode} disabled={loading}>
        {loading ? 'Debugging...' : 'Debug Code'}
      </button>

      {error && <div className="error">{error}</div>}

      <div>
        <h3>Debugged Code:</h3>
        <pre>{debuggedCode}</pre>
      </div>
    </div>
  );
};

export default Debugger;
