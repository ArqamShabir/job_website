import React from 'react';
import './StyleA.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className="logo">
                    <img src="logo2.png" alt="Logo" />
                    <h3 style={{ color: '#fff', marginTop: '2px' }}>LabourLink</h3>
                </div>
                <div className="footer-contact">
                    <p style={{ marginBottom: '10px', fontWeight: 'normal' }}>
                        Call now: <span style={{ color: '#fff', fontWeight: 'normal' }}>(319) 555-0115</span>
                    </p>
                    <p style={{ fontWeight: 'normal' }}>
                        6391 Elgin St. Celina, Delaware 10299, New<br /> York, United States of America
                    </p>
                </div>
                <hr className="footer-separator" />
                <div className="copyright">
                    <span style={{ fontWeight: 'normal' }}>
                        @ 2024 LabourLink - Job Portal. All rights reserved.
                    </span>
                    <img src="SocialMedia.png" alt="Social Media" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
