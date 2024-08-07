import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ApplicantsList = () => {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    useEffect(() => {
        const fetchApplicants = () => {
            setLoading(true);
            axios.get(`http://localhost:3001/job-applicants/${jobId}`)
                .then(response => {
                    setApplicants(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching applicants.');
                    setLoading(false);
                });
        };

        fetchApplicants(); // Initial fetch
    }, [jobId]);

    const handleViewClick = (applicant) => {
        setSelectedApplicant(applicant);
    };

    const handleCloseDialog = () => {
        setSelectedApplicant(null);
    };

    const handleAcceptReject = (applicantId) => {
        axios.post(`http://localhost:3001/update-applicant-status`, { applicantId })
            .then(response => {
                // Update the state to reflect the status change
                setApplicants(prevState => prevState.map(applicant => 
                    applicant.app_id === applicantId ? { ...applicant, app_status: 1 } : applicant
                ));
                // Close the dialog
                setSelectedApplicant(null);
            })
            .catch(error => {
                console.error('Error updating applicant status:', error);
            });
    };

    return (
        <div>
            <h1>Applicants for Job {jobId}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {applicants.map(applicant => (
                        <li key={applicant.app_id}>
                            {applicant.app_name} - ATS Score: {applicant.ats_score} - Proofs: {applicant.proofs_count}
                            <button onClick={() => handleViewClick(applicant)}>
                                {applicant.app_status === 0 ? 'View' : 'Accepted'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {selectedApplicant && (
                <div className="dialog-box">
                    <div className="dialog-content">
                        <span className="close-button" onClick={handleCloseDialog}>&times;</span>
                        <h2>Applicant Details</h2>
                        <p>Name: {selectedApplicant.app_name}</p>
                        <p>ATS Score: {selectedApplicant.ats_score}</p>
                        <p>Number of Proofs: {selectedApplicant.proofs_count}</p>
                        <p>
                            Resume: <a href={`http://localhost:3001/${selectedApplicant.app_resume}`} target="_blank" rel="noopener noreferrer">Download Resume</a>
                        </p>
                        <p>Proofs:</p>
                        <ul>
                            {selectedApplicant.proofs && selectedApplicant.proofs.split(',').map((proof, index) => (
                                <li key={index}><a href={`http://localhost:3001/${proof}`} target="_blank" rel="noopener noreferrer">View Proof {index + 1}</a></li>
                            ))}
                        </ul>
                        {selectedApplicant.app_status === 0 && (
                            <button onClick={() => handleAcceptReject(selectedApplicant.app_id)}>Accept</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicantsList;
