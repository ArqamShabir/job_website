import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import CompanyHome from './components/CompanyHome'; // Import CompanyHome
import CompanyLogin from './components/CompanyLogin';
import CompanySignup from './components/CompanySignup';
import Login from './components/Login';
import Signup from './components/SignUp';

import './App.css';
import ApplicantsList from './components/ApplicantsList';
import CompanyJobPost from './components/CompanyJobPost';
import HomePage2 from './components/HomePage2';
import U_home from './components/U_home';
import UserOneJob from './components/UserOneJob';

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
                    <Link to="/U_home">User HomePage </Link>
                    <Link to="/HomePage2/:categoryName">HomePage2</Link>
                    <Link to="/UserOneJob/:jobId">USER One Job</Link>
                </nav>
                <Routes>
                    <Route path="/SignUp" element={<Signup />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/CompanySignup" element={<CompanySignup />} />
                    <Route path="/CompanyLogin" element={<CompanyLogin />} />
                    <Route path="/AdminLogin" element={<AdminLogin />} />
                    <Route path="/AdminDashboard" element={<AdminDashboard />} />
                    <Route path="/company-home/:email" element={<CompanyHome />} />
                    <Route path="/CompanyJobPost" element={<CompanyJobPost />} />
                    <Route path="/U_home" element={<U_home />} />
                    <Route path="/HomePage2/:categoryName" element={<HomePage2 />} />
                    <Route path="/UserOneJob/:jobId" element={<UserOneJob />} />
                    <Route path="/applicants/:jobId" element={<ApplicantsList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
