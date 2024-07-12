import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import CompanySignup from './components/CompanySignup';
import CompanyLogin from './components/CompanyLogin';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <nav>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/company-signup">Company Signup</Link>
                    <Link to="/company-login">Company Login</Link>
                </nav>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/company-signup" element={<CompanySignup />} />
                    <Route path="/company-login" element={<CompanyLogin />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
