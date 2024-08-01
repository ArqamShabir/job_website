import axios from 'axios';
import React from 'react';
import {  useNavigate } from 'react-router-dom';
import './StyleA.css';


const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('js_name');
        localStorage.removeItem('js_id');
        navigate('/Login'); 
    };

    const navigateToU_Home = () => {
        navigate('/U_home'); 
    };
    
    return (
        <header className="header">
            <div className="logo">
                <img src="logo.png" alt="Logo" />
                <h3 style={{ marginTop: '2px',cursor: 'pointer' }} onClick={navigateToU_Home}>LabourLink</h3>
            </div>
            <div className="user-info">
                <div className="avatar">
                    <img src="avatar.png" alt="Avatar" />
                </div>
                <div className="user-text">
                    <span>{localStorage.getItem('js_name')}</span>
                    <button onClick={() => handleLogout()} id="user-logout">Logout</button>
                </div>
            </div>
        </header>
    );
};



export default Header;
