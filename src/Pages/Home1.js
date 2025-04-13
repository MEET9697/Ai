import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the AI Code Debugger</h1>
      <p>Ready to debug your code?</p>
      <Link to="/debugger">Go to Debugger</Link>
    </div>
  );
};

export default Home;
