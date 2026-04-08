import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Auth ke liye
import { getFirestore } from "firebase/firestore"; // Database ke liye

const firebaseConfig = {
  apiKey: "AIzaSyAxUKePktYLyHjUX1tbODQ3HpkGdyTqYJQ",
  authDomain: "healthdish-1.firebaseapp.com",
  projectId: "healthdish-1",
  storageBucket: "healthdish-1.firebasestorage.app",
  messagingSenderId: "366075142209",
  appId: "1:366075142209:web:73fe91324c81026650e6c0",
  measurementId: "G-GL9HDBKZ0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inhe export karna sabse zaroori hai
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;