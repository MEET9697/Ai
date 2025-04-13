import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Check if Firebase has already been initialized
if (!getApps().length) {
  // Initialize Firebase if it's not already initialized
  initializeApp(firebaseConfig);
} else {
  // Get the already initialized Firebase app
  getApp();
}

// Export Firebase Auth
const auth = getAuth();

export { auth };
