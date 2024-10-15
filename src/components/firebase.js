//firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgRZPXh6IgN5ROdV6eiFOc0NIWWs8zirc",
  authDomain: "siva-d835e.firebaseapp.com",
  projectId: "siva-d835e",
  storageBucket: "siva-d835e.appspot.com",
  messagingSenderId: "1050958760075",
  appId: "1:1050958760075:web:48ec2ffd3c1f7024ccec8e",
  measurementId: "G-9XHC6T4ZSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export `db`
const db = getFirestore(app);

export { db };
// Export the config so it can be reused
export { firebaseConfig };