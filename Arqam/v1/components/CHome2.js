import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CHome2() {
    const [companyName, setCompanyName] = useState('');
    const [jobCount, setJobCount] = useState(0);
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const registrationNumber = localStorage.getItem('companyRegistrationNumber');
        if (registrationNumber) {
            axios.get(`http://localhost:3001/company-info/${registrationNumber}`)
                .then(response => {
                    setCompanyName(response.data.name);
                    setJobCount(response.data.activeJobCount);
                })
                .catch(error => {
                    console.error("Error fetching company info:", error);
                });

            axios.get(`http://localhost:3001/company-jobs/${registrationNumber}`)
                .then(response => {
                    setJobs(response.data);
                })
                .catch(error => {
                    console.error("Error fetching jobs:", error);
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

    const closeJob = (jobId) => {
        axios.post(`http://localhost:3001/close-job/${jobId}`)
            .then(response => {
                alert(response.data);
                setJobs(jobs.map(job => job.j_id === jobId ? { ...job, j_status: false } : job));
            })
            .catch(error => {
                console.error("Error closing job:", error);
            });
    };

    const handleViewApplicants = (jobId) => {
        navigate(`/applicants/${jobId}`);
    };

    return (
        <>
            <button onClick={handleJob}>Post a Job</button>
            <button onClick={handleLogout}>Logout</button>
            <h1>Hello {companyName}</h1>
            <h3>{jobCount} Jobs</h3>
            <h2>Jobs List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Number of Applicants</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.j_id}>
                            <td>{job.job_title}</td>
                            <td>{job.applicantCount}</td>
                            <td>{job.j_status ? 'Active' : 'Closed'}</td>
                            <td>
                                {job.j_status && <button onClick={() => closeJob(job.j_id)}>Close Job</button>}
                            </td>
                            <td><button onClick={() => handleViewApplicants(job.j_id)}>View Applicants</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default CHome2;
