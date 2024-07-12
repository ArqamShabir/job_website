import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const CompanyLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:3001/company-login', formData)
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                console.error("There was an error logging in the company!", error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Company Login</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default CompanyLogin;
