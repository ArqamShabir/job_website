// src/components/Home.js

import React from 'react';
import './home.css'; // Assuming you put the styles in a CSS file

const Home = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
          <h3 style={{ marginTop: '2px' }}>LabourLink</h3>
        </div>
        <div className="user-info">
          <div className="avatar" style={{ marginRight: '20px' }}>
            <img src="Ellipse 18.png" alt="Avatar" />
          </div>
          <div className="user-text" style={{ marginRight: '20px' }}>
            <button className="btn-2" id="post-job-button" onClick={() => window.location.href = 'c_jobpost.html'}>Post a Job</button>
          </div>
          <div className="user-text">
            <button id="user-logout" onClick={() => window.location.href = 'CSignUp.html'}>Logout</button>
          </div>
        </div>
      </header>

      <div className="c_home_main">
        <h3>Hello, Imtiaz</h3>
        <h5 style={{ fontWeight: 'normal', color: '#767F8C' }}>Here is your daily activities and applications</h5>

        <div className="jobbox">
          <div>
            <h2>1</h2>
            <h5 style={{ fontWeight: 'normal', color: '#767F8C' }}>Open Jobs</h5>
          </div>
          <div style={{ display: 'flex' }}>
            <img src="Icon.png" alt="" />
          </div>
        </div>

        <div className="jobs_table">
          <h4>Recently Posted Jobs</h4>
          <div className="table">
            <div className="table-header">
              <div className="table-cell">Jobs</div>
              <div className="table-cell">Status</div>
              <div className="table-cell">Applications</div>
              <div className="table-cell">Actions</div>
            </div>

            <div className="table-row">
              <div className="table-cell">Call Operator</div>
              <div className="table-cell">
                <img className="avatar" src="CheckCircle.png" alt="Avatar" />
                <span style={{ color: '#0BA02C' }}>Active</span>
              </div>
              <div className="table-cell">
                <img className="avatar" src="Users.png" alt="Avatar" />
                <span>35 Applications</span>
              </div>
              <div className="table-cell actions">
                <button className="button" onClick={() => window.location.href = 'aplicant.html'}>View Applications</button>
                <button className="button" style={{ color: '#B34141' }}>Close Job</button>
              </div>
            </div>

            <div className="table-row">
              <div className="table-cell">Call Operator</div>
              <div className="table-cell">
                <img className="avatar" src="CheckCircle2.png" alt="Avatar" />
                <span style={{ color: '#B34141' }}>Closed</span>
              </div>
              <div className="table-cell">
                <img className="avatar" src="Users.png" alt="Avatar" />
                <span>23 Applications</span>
              </div>
              <div className="table-cell actions">
                <button className="button" onClick={() => window.location.href = 'aplicant.html'}>View Applications</button>
                <button className="button" style={{ color: '#fff', background: '#A7ADB4' }} disabled>Closed</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-left">
          <div className="logo">
            <img src="logo2.png" alt="Logo" />
            <h3 style={{ color: '#fff', marginTop: '2px' }}>LabourLink</h3>
          </div>
          <div className="footer-contact">
            <p style={{ marginBottom: '10px', fontWeight: 'normal' }}>Call now: <span style={{ color: '#fff', fontWeight: 'normal' }}>(319) 555-0115</span></p>
            <p style={{ fontWeight: 'normal' }}>6391 Elgin St. Celina, Delaware 10299, New<br /> York, United States of America</p>
          </div>
          <hr className="footer-separator" />
          <div className="copyright">
            <span style={{ fontWeight: 'normal' }}>@ 2024 LaborLink - Job Portal. All rights reserved.</span>
            <img src="SocialMedia.png" alt="Image" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
