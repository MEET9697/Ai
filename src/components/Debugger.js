import React, { useState } from 'react';
import axios from 'axios';

const Debugger = () => {
  const [code, setCode] = useState('');
  const [debuggedCode, setDebuggedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDebug = async () => {
    setIsLoading(true);
    setError(''); // Clear any previous error message
    try {
      // Replace the following line with the actual API call
      const response = await axios.post('YOUR_AI_API_URL', { code });

      if (response.data && response.data.debuggedCode) {
        setDebuggedCode(response.data.debuggedCode);
      } else {
        setError('Something went wrong while debugging the code.');
      }
    } catch (err) {
      setError('There was an error contacting the API. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>AI Code Debugger</h2>
      <textarea
        rows="10"
        cols="50"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <br />
      <button onClick={handleDebug} disabled={isLoading}>
        {isLoading ? 'Debugging...' : 'Debug Code'}
      </button>
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Debugged Code:</h3>
      <pre>{debuggedCode}</pre>
    </div>
  );
};

export default Debugger;
