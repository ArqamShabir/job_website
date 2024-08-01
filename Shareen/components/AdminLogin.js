import React, { useState } from 'react';
import axios from 'axios';
import './adminLoginStyle.css';


const AdminLogin = () => {

        const [formData,setFormData] = useState({
            username:"",
            password:""
        });
        const [errorMessage, setErrorMessage] = useState('');


        const handleChange = e => {
            setFormData({...formData,[e.target.name] : e.target.value});
            setErrorMessage(''); 
        };

        const handleSubmit = e => {
            e.preventDefault();
            setErrorMessage('');
            axios.post('http://localhost:3001/admin-login',formData)

                .then(response =>{
                    window.location.href = '/AdminDashboard';
                })

                .catch(error => {
                    setErrorMessage('Incorrect username or password');
                    console.error('There was an error loging in for admin!',error);
                })
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
                <div>
                <h2 id="admin-login-h2">Login</h2>

                </div>


                <form onSubmit={handleSubmit} className="form-container">
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    {errorMessage && <div className="error-messages" style={{ color: 'red' }}>{errorMessage}</div>}
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="right">
                <img src="login_image.png" alt="Image" />
            </div>
        </div>
        );
    


}//adminlogin

export default AdminLogin;
