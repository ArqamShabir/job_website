import axios from 'axios';
import React, { useState } from 'react';

const CompanySignup = () => {
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        phone_number: '',
        country_code: '',
        password: '',
        confirm_password: '',
        registration_number: '',
        logo: ''
    });

    const handleChange = e => {
        if (e.target.name === 'logo') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match!");
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        axios.post('http://localhost:3001/company-signup', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                console.error("There was an error registering the company!", error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Company Signup</h2>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <select name="country_code" onChange={handleChange} required>
                <option value="">Select Country Code</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
                {/* Add more country codes as needed */}
            </select>
            <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} required />
            <input type="text" name="registration_number" placeholder="Registration Number" onChange={handleChange} required />
            <input type="file" name="logo" accept="image/*" onChange={handleChange} required />
            <button type="submit">Signup</button>
        </form>
    );
};

export default CompanySignup;
