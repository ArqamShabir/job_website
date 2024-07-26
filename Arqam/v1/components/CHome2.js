import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CHome2() {
    const [companyName, setCompanyName] = useState('');
    const [jobCount, setJobCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const registrationNumber = localStorage.getItem('companyRegistrationNumber');
        if (registrationNumber) {
            axios.get(`http://localhost:3001/company-info/${registrationNumber}`)
                .then(response => {
                    setCompanyName(response.data.name);
                    setJobCount(response.data.jobCount);
                })
                .catch(error => {
                    console.error("Error fetching company info:", error);
                });
        } else {
            console.log("No registration number found in local storage.");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('companyRegistrationNumber');
        navigate('/CompanyLogin');
    };

    const handleJob = () => {
        navigate('/CompanyJobPost');
    };

    return (
        <>
            <button onClick={handleJob}>Post a Job</button>
            <button onClick={handleLogout}>Logout</button>
            <h1>Hello {companyName}</h1>
            <h3>{jobCount} Jobs</h3>
        </>
    );
}

export default CHome2;
