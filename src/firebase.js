// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA0OKyRqAlI9D9tb-Fp11CFEVaAB6084a8",
  authDomain: "ai-code-debuggger.firebaseapp.com",
  projectId: "ai-code-debuggger",
  storageBucket: "ai-code-debuggger.firebasestorage.app",
  messagingSenderId: "186575586768",
  appId: "1:186575586768:web:a357bd75d428cf8c0325d5",
  measurementId: "G-P1CHQDC7S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
