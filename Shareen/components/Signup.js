import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: ''
    });

    const [errors, setErrors] = useState([]);
    const [messages, setMessages] = useState([]);

    const handleEmailChange = e => {
        setFormData({ ...formData, email: e.target.value });
        checkEmail(e.target.value);
    };

    const handlePhoneChange = e => {
        setFormData({ ...formData, phone_number: e.target.value });
        checkPhone(e.target.value);
    };

    const checkEmail = email => {
        axios.post('http://localhost:3001/check-user-email', { email })
            .then(response => {
                if (response.data.exists) {
                    setErrors(prevErrors => [...prevErrors, 'Email already exists!']);
                } else {
                    setErrors(prevErrors => prevErrors.filter(error => error !== 'Email already exists!'));
                }
            })
            .catch(error => {
                console.error("There was an error checking the email!", error);
            });
    };

    const checkPhone = phone => {
        axios.post('http://localhost:3001/check-user-phone', { phone })
            .then(response => {
                if (response.data.exists) {
                    setErrors(prevErrors => [...prevErrors, 'Phone number already exists!']);
                } else {
                    setErrors(prevErrors => prevErrors.filter(error => error !== 'Phone number already exists!'));
                }
            })
            .catch(error => {
                console.error("There was an error checking the phone number!", error);
            });
    };

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            setErrors(prevErrors => [...prevErrors, 'Passwords do not match!']);
            return;
        } else {
          setErrors(prevErrors => prevErrors.filter(error => error !== 'Passwords do not match!'));
        }
        if (errors.length > 0) {
            return;
        }

        const userData = {
            name: `${formData.first_name} ${formData.last_name}`,
            gender: formData.gender,
            email: formData.email,
            phone_number: formData.phone_number,
            password: formData.password
        };

        axios.post('http://localhost:3001/signup', userData)
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                console.error("There was an error registering the user!", error);
                setErrors(prevErrors => [...prevErrors, 'Error submitting form. Please try again.']);
            });
    };

    useEffect(() => {
        setMessages(errors.map(error => error));
    }, [errors]);

    const handleCompanyToggle = () => {
        navigate('/CompanySignup'); 
    };

    return (

        <div className="c_login_main c_signup_main">
        <div className="left">
            <header className="header" style={{ justifyContent: 'center', position: 'absolute', top: 0, width: '100%', boxShadow: 'none' }}>
                <div className="logo">
                    <img src="logo.png" alt="Logo" />
                    <h3 style={{ marginTop: '2px' }}>LabourLink</h3>
                </div>
            </header>

            <div style={{ marginTop: '70px' }}>
                <div className="toggle">
                    <h4 className="active">JobSeeker</h4>
                    <h4 id="companyToggle" onClick={handleCompanyToggle}>Company</h4>
                </div>

                <div className="text" style={{ textAlign: 'center' }}>
                    <h1>Create account.</h1>
                    <h4>Already have an account? <a style={{ color: '#0A65CC', cursor: 'pointer', fontWeight: '600', textDecoration: 'none' }} href="Login">Log In</a></h4>
                </div>

                <form onSubmit={handleSubmit} id="register-form">
                    <div className="name-fields">
                        <input type="text" placeholder="Full Name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                        <input type="text" placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                    </div>

                    <div className="gender">
                        <label>
                            <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                            Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                            Female
                        </label>
                    </div>

                    <div className="phone">
                        <input type="text" placeholder="000-0000000" id="phone-num" name="phone_number" value={formData.phone_number} onChange={handlePhoneChange} required />
                    </div>

                    <input type="email" placeholder="E-mail" id="email" name="email" value={formData.email} onChange={handleEmailChange} required />

                    <input type="password" placeholder="Password" id="user-reg-pass" name="password" value={formData.password} onChange={handleChange} required />
                    <input type="password" placeholder="Confirm Password" id="user-reg-c-pass" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />

                    <div className="error-messages">
                        {messages.map((errorMessage, index) => (
                            <div key={index} style={{ color: 'red' }}>
                                {errorMessage}
                            </div>
                        ))}
                    </div>

                    <input type="submit" id="user-signup" value="Sign Up" />
                </form>
            </div>
        </div>
        <div className="right">
            <img src="login_image.png" alt="Image" />
        </div>
    </div>
    );
};

export default Signup;

