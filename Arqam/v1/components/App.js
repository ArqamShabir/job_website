import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';


const App = () => {
    return (
      <Router>
      <div className="app-container">
          <nav>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
          </nav>
          <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
          </Routes>
      </div>
  </Router>
    );
};

export default App;
