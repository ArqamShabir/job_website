import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {

        const [formData,setFormData] = useState({
            username:"",
            password:""
        });

        const handleChange = e => {
            setFormData({...formData,[e.target.name] : e.target.value});
        };

        const handleSubmit = e => {
            e.preventDefault();
            axios.post('http://localhost:3001/admin-login',formData)

                .then(response =>{
                    //alert(response.data);
                    window.location.href = '/AdminDashboard';
                })

                .catch(error => {
                    console.error('There was an error loging in for admin!',error);
                })
        };

        return (
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Admin Login</h2>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        );
    


}//adminlogin

export default AdminLogin;

