import React from 'react';
import './CB_styles.css';  


const CompanyBlocked = () => {         
    return (        
        <div>
            <div className="shadow"></div>
            <div className="message">
                <div className="box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <p>Hello Imtiaz</p>
                        <button id="c-blocked-logout" ><a href='CompanyLogin.js'>Logout</a></button>
                    </div>
                    <p>
                        Company verification in progress. Please wait until our team has completed
                        your verification process. You will receive a notification once this step is completed.
                        Thank you for your cooperation!
                    </p>
                </div>
            </div>
            <header className="header">
                <div className="logo">
                    <img src="logo2.png" alt="Logo" />
                    <h3 style={{ marginTop: '2px' }}>LabourLink</h3>
                </div>
                <div className="user-info">
                    <div className="avatar" style={{ marginRight: '20px' }}>
                        <img src="Ellipse 18.png" alt="Avatar" />
                    </div>
                    <div className="user-text" style={{ marginRight: '20px' }}>
                        <button className="btn-2" id="post-job-button">Post a Job</button>
                    </div>
                    <div className="user-text">
                        <button id="user-logout" onClick={() => window.location.href='CSignUp.html'}>Logout</button>
                    </div>
                </div>
            </header>

            <div className="c_home_main">
                <h3>Hello, Imtiaz</h3>
                <h5 style={{ fontWeight: 'normal', color: '#767F8C' }}>Here is your daily activities and applications</h5>

                <div className="jobbox">
                    <div>
                        <h2>0</h2>
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
                    </div>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-left">
                    <div className="logo">
                        <img src="src/images/logo2.png" alt="Logo" />
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
        </div>
    );
};

export default CompanyBlocked;
