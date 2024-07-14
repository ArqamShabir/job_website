import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link,  } from 'react-router-dom';
import Signup from './components/SignUp';
import Login from './components/Login';
import CompanySignup from './components/CompanySignup';
import CompanyLogin from './components/CompanyLogin';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';


import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <nav>
                    <Link to="/Signup">Signup</Link>
                    <Link to="/Login">Login</Link>
                    <Link to="/CompanySignup">Company Signup</Link>
                    <Link to="/CompanyLogin">Company Login</Link>
                    <Link to="/AdminLogin">Admin Login</Link>
                    <Link to="/AdminDashboard">Admin Dashboard</Link>

                </nav>
                <Routes>
                    <Route path="/SignUp" element={<Signup />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/CompanySignup" element={<CompanySignup />} />
                    <Route path="/CompanyLogin" element={<CompanyLogin />} />
                    <Route path="/AdminLogin" element={<AdminLogin />} />
                    <Route path="/AdminDashboard" element={<AdminDashboard />} />

                </Routes>
            </div>

        </Router>

        
    );
};

export default App;
