import axios from 'axios';
import React, { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        country_code: '',
        phone_number: '',
        password: '',
        confirm_password: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match!");
            return;
        }
        axios.post('http://localhost:3001/signup', formData)
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                console.error("There was an error registering the user!", error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Signup</h2>
            <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
            <div className="gender-container">
                <label>
                    <input type="radio" name="gender" value="Male" onChange={handleChange} required />
                    Male
                </label>
                <label>
                    <input type="radio" name="gender" value="Female" onChange={handleChange} required />
                    Female
                </label>
            </div>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <select name="country_code" onChange={handleChange} required>
                <option value="">Select Country Code</option>
                <option value="+1">+92</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
            </select>
            <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} required />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
