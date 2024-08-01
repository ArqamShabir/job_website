// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './styleHomePage2.css'; 
// import Header from './Header';
// import Footer from './Footer';


// const UserOneJob = () => {
//   const { jobId } = useParams();
  
//   const [job, setJob] = useState(null);
//   const [error, setError] = useState('');
//   const [skills, setSkills] = useState([]);
//   const [days, setDays] = useState([]);
//   const [loading, setLoading] = useState(true); // Added loading state

//   //for applicants
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNo, setPhone] = useState('');
//   const [age, setAge] = useState('');
//   const [education, setEducation] = useState('');
//   const [experience, setExperience] = useState('');
//   const [gender, setGender] = useState('');

//   const [showApplyForm, setShowApplyForm] = useState(false);
//   const [showAUSpopup, setShowAUSpopup] = useState(false);



//   useEffect(() => {
//     axios.get(`http://localhost:3001/one-job/${jobId}`)
//       .then(response => {
//         console.log('Job data:', response.data); // Log response data
//         setJob(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching job details:', error);
//         setError('Failed to fetch job details. Please try again later.');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [jobId]);

//   useEffect(() => {
//     if (job && job.j_id) {
//       axios.get(`http://localhost:3001/one-job/${job.j_id}/skills`)
//         .then(response => {
//           setSkills(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching job skills:', error);
//         });
//     }
//   }, [job]);

//   useEffect(() => {
//     if (job && job.j_id) {
//       axios.get(`http://localhost:3001/one-job/${job.j_id}/days`)
//         .then(response => {
//           setDays(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching job days:', error);
//         });
//     }
//   }, [job]);

//   const handleApplyForm = () => {
//       setShowApplyForm(true);
//   };

  

//   const handleConfirmApply = (event) => {
//     event.preventDefault();
//     console.log('Handle Confirm Apply');
//     setShowAUSpopup(true);
//   };

//   const confirmSubmit = () => {
//     console.log('Confirm Submit');
//     setShowAUSpopup(false);

//     const registrationNumber = localStorage.getItem('companyRegistrationNumber');

//     const applicantData = {
//       name,
//       gender,
//       email,
//       phoneNo,
//       age,
//       education,
//       experience,
//       j_id: jobId,
//       c_registrationNo: registrationNumber
//     };

//     axios.post('http://localhost:3001/user-apply-job', applicantData)
//       .then(response => {
//         console.log(response.data);
//         setShowApplyForm(false);
//       })
//       .catch(error => {
//         console.error('There was an error submitting the application!', error);
//       });
//   };

//   const cancelSubmit = () => {
//     setShowAUSpopup(false);
//   };



//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   if (!job) {
//     return <div>No job details available.</div>;
//   }

// return (
//   <div>
//         <Header />
//     <div id="uOneJobContent">
//       <div id="job_head">
//         <div id="job_subhead">
//           <h3 id="j_h_h3">{job.job_title || 'N/A'}</h3>
//           <h4 id="j_h_h4">{job.name || 'N/A'}</h4>
//         </div>
//         <button className="applyNow1" id="applyNowBut" onClick={() => handleApplyForm()}>
//           Apply Now
//         </button>
//       </div>

//       <div className="job_descrip">
//         <h3>Job Description</h3>
//         <p id="job-des-p">{job.job_description || 'N/A'}</p>
//       </div>

//       <div className="job-overview-container">
//         <h3 id="job-overview">Job Overview</h3>

//         <div id="job-overview-r1">
//           <div className="jo-row">
//             <div className="jo-icon"><img className="jo-icon-img" src="CalendarBlank.svg" alt="Calendar Icon" /></div>
//             <div className="jo-info">
//               <p className="row-title">JOB POSTED:</p>
//               <p className="row-title-para">{job.j_date || 'N/A'}</p>
//             </div>
//           </div>
//           <div className="jo-row">
//             <div className="jo-icon"><img className="jo-icon-img" src="briefcase.svg" alt="Briefcase Icon" /></div>
//             <div className="jo-info">
//               <p className="row-title">EDUCATION</p>
//               <p className="row-title-para">{job.education || 'N/A'}</p>
//             </div>
//           </div>
//           <div className="jo-row">
//             <div className="jo-icon"><img className="jo-icon-img" src="Wallet.svg" alt="Wallet Icon" /></div>
//             <div className="jo-info">
//               <p className="row-title">SALARY:</p>
//               <p className="row-title-para">
//                 {job.min_salary && job.max_salary
//                   ? `Rs ${job.min_salary} - Rs ${job.max_salary}`
//                   : 'N/A'}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div id="job-overview-r2">
//           <div className="jo-row">
//             <div className="jo-icon"><img className="jo-icon-img" src="MapPinLine.svg" alt="Map Pin Icon" /></div>
//             <div className="jo-info">
//               <p className="row-title">LOCATION:</p>
//               <p className="row-title-para">{job.job_city || 'N/A'}</p>
//             </div>
//           </div>
//           <div className="jo-row">
//             <div className="jo-icon"><img className="jo-icon-img" src="briefcase.svg" alt="Briefcase Icon" /></div>
//             <div className="jo-info">
//               <p className="row-title">EXPERIENCE</p>
//               <p className="row-title-para">{job.experience || 'N/A'}</p>
//             </div>
//           </div>
//           <div className="jo-row">
//             <div className="jo-icon"><img className="jo-icon-img" src="briefcase.svg" alt="Briefcase Icon" /></div>
//             <div className="jo-info">
//               <p className="row-title">VACANCIES:</p>
//               <p className="row-title-para">{job.vacancies || 'N/A'}</p>
//             </div>
//           </div>
//         </div>

//         <div id="job-overview-r3">
//           <div className="jo-row">
//             <div className="jo-icon"><img className="jo-icon-img" src="CalendarBlank.svg" alt="Calendar Icon" /></div>
//             <div className="jo-info">
//               <p className="row-title">AGE:</p>
//               <p className="row-title-para">{job.age || 'N/A'}</p>
//             </div>
//           </div>
//           <div className="jo-row">
//             <div className="jo-icon"><img className="jo-icon-img" src="briefcase.svg" alt="Briefcase Icon" /></div>
//             <div className="jo-info">
//               <p className="row-title">GENDER:</p>
//               <p className="row-title-para">{job.preferred_gender || 'N/A'}</p>
//             </div>
//           </div>
//           <div className="jo-row">
//             <div className="jo-icon"><img className="jo-icon-img" src="CalendarBlank.svg" alt="Calendar Icon" /></div>
//             <div className="jo-info">
//               <p className="row-title">HOURS:</p>
//               <p className="row-title-para">{job.job_hours || 'N/A'}</p>
//             </div>
//           </div>
//         </div>

//         <div className="jo-row">
//           <div className="jo-icon"><img className="jo-icon-img" src="CalendarBlank.svg" alt="Calendar Icon" /></div>
//           <div className="jo-info">
//             <p className="row-title">DAYS:</p>
//             <div className="jo-days">
//               {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
//                 <div key={index} className={`jo-day ${days.includes(day) ? 'jo-day-active' : 'jo-day'}`}>{day}</div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="job_descrip" id="job_descrip-skills">
//         <h3>Skills</h3>
//         <ul id="skills-ul">
//           {skills.length > 0
//             ? skills.map((skill, index) => (
//                 <li key={index}>{skill}</li>
//               ))
//             : 'No skills listed.'}
//         </ul>
//       </div>
//     </div>

//     {showApplyForm && ( 
//               <div className="form-container">
//               <form onSubmit={handleConfirmApply}>
//                 <div className="form-row">
//                   <label htmlFor="name">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     placeholder="Enter your name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label htmlFor="phoneNo">Phone Number</label>
//                   <input
//                     type="tel"
//                     id="phoneNo"
//                     name="phoneNo"
//                     placeholder="Enter your phone number"
//                     value={phoneNo}
//                     onChange={(e) => setPhone(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label htmlFor="age">Age</label>
//                   <input
//                     type="number"
//                     id="age"
//                     name="age"
//                     placeholder="Enter your age"
//                     value={age}
//                     onChange={(e) => setAge(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label htmlFor="gender">Gender</label>
//                   <select
//                     id="gender"
//                     name="gender"
//                     value={gender}
//                     onChange={(e) => setGender(e.target.value)}
//                     required
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </select>
//                 </div>
//                 <div className="form-row">
//                   <label htmlFor="education">Education</label>
//                   <input
//                     type="text"
//                     id="education"
//                     name="education"
//                     placeholder="Enter your education"
//                     value={education}
//                     onChange={(e) => setEducation(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label htmlFor="experience">Experience</label>
//                   <input
//                     type="text"
//                     id="experience"
//                     name="experience"
//                     placeholder="Enter your experience"
//                     value={experience}
//                     onChange={(e) => setExperience(e.target.value)}
//                     required
//                   />
//                 </div>
//                 {/* <div className="form-row">
//                   <label htmlFor="resume">Upload Resume (PDF format, up to 50MB)</label>
//                   <input
//                     type="file"
//                     id="resume"
//                     name="resume"
//                     onChange={(e) => setResume(e.target.files[0])}
//                     required
//                   />
//                 </div>
//                 <div className="form-row">
//                   <label htmlFor="proof">Upload Proof (optional, PDF format, up to 50MB)</label>
//                   <input
//                     type="file"
//                     id="proof"
//                     name="proof"
//                     onChange={(e) => setProof(e.target.files[0])}
//                   />
//                 </div> */}
//                 <div className="form-row">
//                   <button type="submit">Submit Application</button>
//                 </div>
//               </form>
//               <button className="closebutton" id="close-btn-verify" onClick={() => setShowApplyForm(false)} >&times;</button>

//             </div>    
//     )};

//     {showAUSpopup && (
//             <div className="admin-popup-container">
//             <div className="admin-popup">
//               {/* <img src={''} alt="Verify" className="admin-popup-icon" /> */}
//               <div className="admin-popup-info">
//                 <h2>Submit Application</h2>
//                 <pre>Are you sure you want to submit application for this job?</pre>
//               </div>
//               <button className="yes-btn" onClick={confirmSubmit} >Yes, Confirm</button>
//               <button className="close-btn" onClick={cancelSubmit}> &times; </button>
//             </div>
//           </div>
      
//     )};
//         <Footer />


// </div>

    
// );

// };

// export default UserOneJob;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styleHomePage2.css'; 
import Header from './Header';
import Footer from './Footer';

const UserOneJob = () => {
  const { jobId } = useParams();
  const js_id = localStorage.getItem('js_id');
  
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [skills, setSkills] = useState([]);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  //for applicants
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [gender, setGender] = useState('');
  const [resume, setResume] = useState(null);
  const [proofs, setProofs] = useState([]);

  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showAUSpopup, setShowAUSpopup] = useState(false);



  useEffect(() => {
    axios.get(`http://localhost:3001/one-job/${jobId}`)
      .then(response => {
        console.log('Job data:', response.data); // Log response data
        setJob(response.data);
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
        setError('Failed to fetch job details. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [jobId]);

  useEffect(() => {
    if (job && job.j_id) {
      axios.get(`http://localhost:3001/one-job/${job.j_id}/skills`)
        .then(response => {
          setSkills(response.data);
        })
        .catch(error => {
          console.error('Error fetching job skills:', error);
        });
    }
  }, [job]);

  useEffect(() => {
    if (job && job.j_id) {
      axios.get(`http://localhost:3001/one-job/${job.j_id}/days`)
        .then(response => {
          setDays(response.data);
        })
        .catch(error => {
          console.error('Error fetching job days:', error);
        });
    }
  }, [job]);

  const handleApplyForm = () => {
      setShowApplyForm(true);
  };

  

  const handleConfirmApply = (event) => {
    event.preventDefault();
    console.log('Handle Confirm Apply');
    setShowAUSpopup(true);
  };

  const confirmSubmit = () => {
    console.log('Confirm Submit');
    setShowAUSpopup(false);

    const registrationNumber = localStorage.getItem('companyRegistrationNumber');

    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('email', email);
    formData.append('phoneNo', phoneNo);
    formData.append('age', age);
    formData.append('education', education);
    formData.append('experience', experience);
    formData.append('j_id', jobId);
    formData.append('c_registrationNo', registrationNumber);
    formData.append('js_id', js_id);

    if (resume) formData.append('resume', resume);
    for (let i = 0; i < proofs.length; i++) {
      formData.append('proofs', proofs[i]);
    }

    axios.post('http://localhost:3001/user-apply-job', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
        console.log(response.data);
        setShowApplyForm(false);
      })
      .catch(error => {
        console.error('There was an error submitting the application!', error);
      });
  };

  const cancelSubmit = () => {
    setShowAUSpopup(false);
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!job) {
    return <div>No job details available.</div>;
  }

return (
  <div>
      <Header />
    <div id="uOneJobContent">
      <div id="job_head">
        <div id="job_subhead">
          <h3 id="j_h_h3">{job.job_title || 'N/A'}</h3>
          <h4 id="j_h_h4">{job.name || 'N/A'}</h4>
        </div>
        <button className="applyNow1" id="applyNowBut" onClick={() => handleApplyForm()}>
          Apply Now
        </button>
      </div>

      <div className="job_descrip">
        <h3>Job Description</h3>
        <p id="job-des-p">{job.job_description || 'N/A'}</p>
      </div>

      <div className="job-overview-container">
        <h3 id="job-overview">Job Overview</h3>

        <div id="job-overview-r1">
          <div className="jo-row">
            <div className="jo-icon"><img className="jo-icon-img" src="CalendarBlank.svg" alt="Calendar Icon" /></div>
            <div className="jo-info">
              <p className="row-title">JOB POSTED:</p>
              <p className="row-title-para">{job.j_date || 'N/A'}</p>
            </div>
          </div>
          <div className="jo-row">
            <div className="jo-icon"><img className="jo-icon-img" src="briefcase.svg" alt="Briefcase Icon" /></div>
            <div className="jo-info">
              <p className="row-title">EDUCATION</p>
              <p className="row-title-para">{job.education || 'N/A'}</p>
            </div>
          </div>
          <div className="jo-row">
            <div className="jo-icon"><img className="jo-icon-img" src="Wallet.svg" alt="Wallet Icon" /></div>
            <div className="jo-info">
              <p className="row-title">SALARY:</p>
              <p className="row-title-para">
                {job.min_salary && job.max_salary
                  ? `Rs ${job.min_salary} - Rs ${job.max_salary}`
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div id="job-overview-r2">
          <div className="jo-row">
            <div className="jo-icon"><img className="jo-icon-img" src="MapPinLine.svg" alt="Map Pin Icon" /></div>
            <div className="jo-info">
              <p className="row-title">LOCATION:</p>
              <p className="row-title-para">{job.job_city || 'N/A'}</p>
            </div>
          </div>
          <div className="jo-row">
            <div className="jo-icon"><img className="jo-icon-img" src="briefcase.svg" alt="Briefcase Icon" /></div>
            <div className="jo-info">
              <p className="row-title">EXPERIENCE</p>
              <p className="row-title-para">{job.experience || 'N/A'}</p>
            </div>
          </div>
          <div className="jo-row">
            <div className="jo-icon"><img className="jo-icon-img" src="briefcase.svg" alt="Briefcase Icon" /></div>
            <div className="jo-info">
              <p className="row-title">VACANCIES:</p>
              <p className="row-title-para">{job.vacancies || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div id="job-overview-r3">
          <div className="jo-row">
            <div className="jo-icon"><img className="jo-icon-img" src="CalendarBlank.svg" alt="Calendar Icon" /></div>
            <div className="jo-info">
              <p className="row-title">AGE:</p>
              <p className="row-title-para">{job.age || 'N/A'}</p>
            </div>
          </div>
          <div className="jo-row">
            <div className="jo-icon"><img className="jo-icon-img" src="briefcase.svg" alt="Briefcase Icon" /></div>
            <div className="jo-info">
              <p className="row-title">GENDER:</p>
              <p className="row-title-para">{job.preferred_gender || 'N/A'}</p>
            </div>
          </div>
          <div className="jo-row">
            <div className="jo-icon"><img className="jo-icon-img" src="CalendarBlank.svg" alt="Calendar Icon" /></div>
            <div className="jo-info">
              <p className="row-title">HOURS:</p>
              <p className="row-title-para">{job.job_hours || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="jo-row">
          <div className="jo-icon"><img className="jo-icon-img" src="CalendarBlank.svg" alt="Calendar Icon" /></div>
          <div className="jo-info">
            <p className="row-title">DAYS:</p>
            <div className="jo-days">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <div key={index} className={`jo-day ${days.includes(day) ? 'jo-day-active' : 'jo-day'}`}>{day}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="job_descrip" id="job_descrip-skills">
        <h3>Skills</h3>
        <ul id="skills-ul">
          {skills.length > 0
            ? skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))
            : 'No skills listed.'}
        </ul>
      </div>
    </div>

    {showApplyForm && ( 
              <div className="form-container">
              <form onSubmit={handleConfirmApply}>
                <div className="form-row">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="phoneNo">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNo"
                    name="phoneNo"
                    placeholder="Enter your phone number"
                    value={phoneNo}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="education">Education</label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    placeholder="Enter your education"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="experience">Experience</label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    placeholder="Enter your experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                  />
                </div>
                 <div className="form-row">
                  <label htmlFor="resume">Upload Resume (PDF format, up to 50MB)</label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={(e) => setResume(e.target.files[0])}
                    required
                  />
                </div>

                <div className="form-row">
                  <label htmlFor="proof">Upload Proof (optional, PDF format, up to 50MB)</label>
                  <input
                    type="file"
                    id="proof"
                    name="proof"
                    onChange={(e) => setProofs(Array.from(e.target.files))}
                    multiple
                   required
                  />
                </div> 
                <div className="form-row">
                  <button type="submit">Submit Application</button>
                </div>
              </form>
              <button className="closebutton" id="close-btn-verify" onClick={() => setShowApplyForm(false)} >&times;</button>

            </div>   
            
            

           
            


    )};



    

    {showAUSpopup && (
            <div className="admin-popup-container">
            <div className="admin-popup">
              {/* <img src={''} alt="Verify" className="admin-popup-icon" /> */}
              <div className="admin-popup-info">
                <h2>Submit Application</h2>
                <pre>Are you sure you want to submit application for this job?</pre>
              </div>
              <button className="yes-btn" onClick={confirmSubmit} >Yes, Confirm</button>
              <button className="close-btn" onClick={cancelSubmit}> &times; </button>
            </div>
          </div>
      
    )};

{/* <Footer /> */}
</div>


    
);

};

export default UserOneJob;
