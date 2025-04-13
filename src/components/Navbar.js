import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
      <Link to="/home" style={{ color: 'white', marginRight: '15px' }}>Home</Link>
      <Link to="/debugger" style={{ color: 'white', marginRight: '15px' }}>Debugger</Link>
      <Link to="/login" style={{ color: 'white' }}>Logout</Link>
    </nav>
  );
};

export default Navbar;
