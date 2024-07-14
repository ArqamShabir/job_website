import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        country_code: '',
        phone_number: '',
        password: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', formData)
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                console.error("There was an error logging in the user!", error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Login</h2>
            <select name="country_code" onChange={handleChange} required>
                <option value="">Select Country Code</option>
                <option value="+1">+92</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
            </select>
            <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
