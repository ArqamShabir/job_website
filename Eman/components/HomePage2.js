import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styleHomePage2.css'; 

const HomePage2 = () => {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('Other');
  //const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchJobs = (selectedCategory) => {
    axios.get('http://localhost:3001/show-user-jobs', { params: { category: selectedCategory } })
      .then(response => {
        
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  };

  useEffect(() => {
    fetchJobs(category);
  }, [category]);

  const handleApplyClick = (jobId) => {
    //console.log(jobId);
    navigate(`/UserOneJob/${jobId}`);

  };

  return (
    <div className="job-listings-container">
      <h1>Job Listings</h1>
      <div className="category-selector">
        <label htmlFor="category">Select Category: </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Other">Other</option>
          <option value="Salesperson">Salesperson</option>
          <option value="Watchman">Watchman</option>
          <option value="Labour">Labour</option>
          <option value="Driver">Driver</option>
          {/* Add more categories as needed */}
        </select>
      </div>
      <div className="job-listings">
        {jobs.map(job => (
          <div key={job.j_id} className="job">
            <img src={job.company_logo || 'placeholder_logo.svg'} alt={job.company_name} className="imtiaz" />
            <div className="job_info">
              <h5 id="jobTitle">{job.jobTitle}</h5>
              <div className="job_info_para">{job.job_city}, Pakistan</div>
              <div className="job_info_para">Rs: {job.min_salary} - Rs: {job.max_salary}</div>
              <div className="job_info_para">{job.vacancies} Openings</div>
            </div>
            <button className="applyNow1" onClick={() => handleApplyClick(job.j_id)}>
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>



 
  );
};

export default HomePage2;
