import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style-login.css';


const Login = () => {
    const [formData, setFormData] = useState({
        phone_number: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage(''); 
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrorMessage('');
        axios.post('http://localhost:3001/login', formData)
            .then(response => {
                localStorage.setItem('js_id', response.data.js_id);
                localStorage.setItem('js_name', response.data.js_name);
                navigate('/U_home');
            })
            .catch(error => {
                setErrorMessage('Incorrect phone number or password');
                console.error("There was an error logging in the user!", error);
            });
    };

    const handleCompanyToggle = () => {
        navigate('/CompanyLogin'); 
    };

    return (

        <div className="c_login_main">
            <div className="left">
                <header className="header" style={{ justifyContent: 'center', position: 'absolute', top: 0, width: '100%', boxShadow: 'none' }}>
                    <div className="logo">
                        <img src="logo.png" alt="Logo" />
                        <h3 style={{ marginTop: '2px' }}>LabourLink</h3>
                    </div>
                </header>

                <div className="toggle">
                    <h4 className="active">JobSeeker</h4>
                    <h4 id="companyToggle" onClick={handleCompanyToggle}>Company</h4>
                </div>

                <div className="text">
                    <h1>Sign in</h1>
                    <h4>Don’t have an account? <a style={{ color: '#0A65CC', cursor: 'pointer', fontWeight: 600, textDecoration: 'none' }} href="Signup">Create Account</a></h4>
                </div>

                <form onSubmit={handleSubmit} id="user-login-form">
                    <div className="phone">
                        <input type="text" placeholder="000-0000000" id="phone-num" name="phone_number" onChange={handleChange} required />
                    </div>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} required/>
                    {errorMessage && <div className="error-messages" style={{ color: 'red' }}>{errorMessage}</div>}
                    <input type="submit" id="user-login" value="Sign In" />
                </form>
            </div>
            <div className="right">
                <img src="login_image.png" alt="Image" />
            </div>
        </div>
    );
};

export default Login;
