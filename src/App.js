//App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Contest from './components/Contest';
import Discussion from './components/Discussion';
import Profile from './components/Profile';
import Problems from './components/Problems';
import ProblemDescription from './components/ProblemDescription';
import Layout from './components/Layout';
import { ThemeProvider } from './components/ThemeContext'; // Import ThemeProvider
import './App.css'; // Your global app styles

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/problems" element={<Layout><Problems /></Layout>} />
          <Route path="/problems/:id" element={<Layout><ProblemDescription /></Layout>} />
          <Route path="/contests" element={<Layout><Contest /></Layout>} />
          <Route path="/discussions" element={<Layout><Discussion /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
