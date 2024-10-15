//login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { db } from './firebase'; // Import your db
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Add setDoc here

import './css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userDoc = doc(db, 'users', email); // Assume you store users with email as ID
      const docSnap = await getDoc(userDoc);
      
      if (docSnap.exists()) {
        // User exists, proceed with email/password login
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/home');
      } else {
        // User doesn't exist, show error
        setError("User does not exist. Please register first.");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Check if user already exists in Firestore
      const userDoc = doc(db, 'users', user.email);
      const docSnap = await getDoc(userDoc);
      
      if (!docSnap.exists()) {
        // If user does not exist, save their info to Firestore
        await setDoc(userDoc, {
          email: user.email,
          displayName: user.displayName, // Include other user details as needed
          // Add other user details if available
        });
      }
  
      navigate('/home'); // Redirect to home after successful login
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
    }
  };
  

  return (
    <div className="login-page-container">
      <div className="login-page-container-inner">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        
        <div className="google-login">
          <p>Or</p>
          <button onClick={handleGoogleLogin}>Sign in with Google</button>
        </div>
        
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
};

export default Login;
