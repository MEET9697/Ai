import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to Home</h2>
      <p>You are logged in!</p>
    </div>
  );
};

export default Home;
