import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styleHomePage2.css'; 
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';



const HomePage2 = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    jobTitle: '',
    city: '',
    salary: ''
  });

  const navigate = useNavigate();
  const { categoryName } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/show-user-jobs', { params: { category: categoryName } })
      .then(response => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching jobs. Please try again later.');
        setLoading(false);
      });
  }, [categoryName]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };



  const handleSearch = () => {
    const filtered = jobs.filter(job => 
      (!filters.jobTitle || job.job_title.toLowerCase().includes(filters.jobTitle.toLowerCase())) &&
      (!filters.city || job.job_city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.salary || (job.min_salary <= filters.salary && job.max_salary >= filters.salary))
    );
    setFilteredJobs(filtered);
  };

  const handleApplyClick = (jobId) => {
    navigate(`/UserOneJob/${jobId}`);
  };

  return (

    <div className="job-listings-container">
          <Header />
      {/* <h1>Job Listings</h1> */}
      <div id="d1">
        <input type="text"name="jobTitle" value={filters.jobTitle} placeholder="Job Title" className="filter" onChange={handleFilterChange} />
        <input type="text" name="city" value={filters.city} placeholder="City" className="filter" onChange={handleFilterChange}/>
        <input type="number" name="salary" value={filters.salary} placeholder="Salary" className="filter" onChange={handleFilterChange}/>
        <input type="button"  value="Search" id="searchbutton" onClick={handleSearch}/>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="job-listings">
          {filteredJobs.map(job => (
            <div key={job.j_id} className="job">
              <img src={job.company_logo || 'placeholder_logo.svg'} alt={job.company_name} className="imtiaz" />
              <div className="job_info">
                <h5 id="jobTitle">{job.job_title}</h5>
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
      )};
      <Footer />
    </div>
  );
};

export default HomePage2;



