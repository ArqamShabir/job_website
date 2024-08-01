import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [companyData, setCompanyData] = useState([]); 
    const [searchName, setSearchName] = useState('');
    const [searchRegNumber, setSearchRegNumber] = useState('');
    const [showVerifyPopup, setShowVerifyPopup] = useState(false);
    const [showVerifiedPopup, setShowVerifiedPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showDeletedPopup, setShowDeletedPopup] = useState(false);
    const [currentCompany, setCurrentCompany] = useState(null);

    const fetchCompanyData = () => {
        axios.get('http://localhost:3001/AdminDashboard')
            .then(response => {
                setCompanyData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data', error);
            });
    };

    useEffect(() => {
        fetchCompanyData();
    }, []);

    const handleVerify = (company) => {
        setCurrentCompany(company);
        setShowVerifyPopup(true);
    };

    const handleConfirmVerify = () => {
        if (currentCompany) {
            axios.post(`http://localhost:3001/admin-dashboard-verify/${currentCompany.registrationNumber}`)
                .then(response => {
                    fetchCompanyData();
                    setShowVerifyPopup(false);
                    setShowVerifiedPopup(true);
                })
                .catch(error => {
                    console.error('Error verifying company:', error);
                    alert('Failed to verify company');
                });
        }
    };

    const handleDelete = (company) => {
        setCurrentCompany(company);
        setShowDeletePopup(true);
    };

    const handleConfirmDelete = () => {
        if (currentCompany) {
            axios.delete(`http://localhost:3001/admin-dashboard-delete/${currentCompany.registrationNumber}`)
                .then(response => {
                    setCompanyData(companyData.filter(company => company.registrationNumber !== currentCompany.registrationNumber));
                    setShowDeletePopup(false);
                    setShowDeletedPopup(true);
                })
                .catch(error => {
                    console.error('Error deleting company:', error);
                    alert('Failed to delete company');
                });
        }
    };
    

    const handleSearch = () => {
        axios.get('http://localhost:3001/admin-dashboard-search', {
            params: {
                name: searchName,
                registrationNumber: searchRegNumber
            }
        })
        .then(response => {
            setCompanyData(response.data);
        })
        .catch(error => {
            console.error('Error searching companies', error);
        });
    };

    const handleLogout = () => {
        axios.post('http://localhost:3001/admin-logout')
            .then(response => {
                window.location.href = '/AdminLogin';
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <div className="AdminDashboard">
            {showVerifyPopup && (
                <div className="admin-popup-container">
                    <div className="admin-popup">
                        <img src="Icon-verify-pop-up.svg" alt="" className="admin-popup-icon"/>
                        <div className="admin-popup-info">
                            <h2>Verification Of Company</h2>
                            <pre>Are you sure you want to verify the company with<br/>registration number {currentCompany?.registrationNumber}?</pre>
                        </div>
                        <button className="yes-btn" id="yes-verify-btn" onClick={handleConfirmVerify}>Yes, Confirm</button>
                        <button className="close-btn" onClick={() => setShowVerifyPopup(false)}>&times;</button>
                    </div>
                </div>
            )}

            {showVerifiedPopup && (
                <div className="admin-popup-container">
                    <div className="admin-popup">
                        <img src="Icon-verify-pop-up.svg" alt="" className="admin-popup-icon"/>
                        <div className="admin-popup-info-after">
                            <h2>Successfully Verified</h2>
                            <pre>The company with registration number {currentCompany?.registrationNumber} has been<br/>successfully verified.</pre>
                        </div>
                        <button className="close-btn" onClick={() => setShowVerifiedPopup(false)}>&times;</button>
                    </div>
                </div>
            )}

            {showDeletePopup && (
                <div className="admin-popup-container">
                    <div className="admin-popup">
                        <img src="Icon-delete-pop-up.svg" alt="" className="admin-popup-icon"/>
                        <div className="admin-popup-info">
                            <h2>Deletion Of Company</h2>
                            <pre>Are you sure you want to remove the company with<br/>registration number {currentCompany?.registrationNumber}?</pre>
                        </div>
                        <button className="yes-btn" id="yes-delete-btn" onClick={handleConfirmDelete}>Yes, Remove</button>
                        <button className="close-btn" onClick={() => setShowDeletePopup(false)}>&times;</button>
                    </div>
                </div>
            )}

            {showDeletedPopup && (
                <div className="admin-popup-container">
                    <div className="admin-popup">
                        <img src="Icon-delete-pop-up.svg" alt="" className="admin-popup-icon"/>
                        <div className="admin-popup-info-after">
                            <h2>Successfully Deleted</h2>
                            <pre>The company with registration number {currentCompany?.registrationNumber} has been<br/>successfully deleted.</pre>
                        </div>
                        <button className="close-btn" onClick={() => setShowDeletedPopup(false)}>&times;</button>
                    </div>
                </div>
            )}

            <div className="topnav">
                <img src="Page title.svg" alt="" id="topnav-title" />
                <button id="admin-logout" onClick={handleLogout}>Logout</button>
            </div>

            <div className="sidebar">
                <img src="Group 47750.svg" alt="" id="sidebar-img" />
            </div>

            <div id="admin-company-search">
                <h2 id="admin-company-info">Companies Information</h2>
                <div id="admin-search-inner">
                    <div id="admin-search-name">
                        <label htmlFor="Name">Name</label> <br/> <br/>
                        <input type="text" className="admin-search-input" placeholder="Enter Company Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                    </div>
                    <div id="admin-search-regNo">
                        <label htmlFor="regName">Registration Number</label> <br/> <br/>
                        <input type="number" className="admin-search-input" placeholder="Enter Registration Number" value={searchRegNumber} onChange={(e) => setSearchRegNumber(e.target.value)} />
                    </div>
                    <div id="admin-search-button-div">
                        <button id="admin-search-button" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>

            <div id="admin-company-table-div">
                <table cellPadding="10px" cellSpacing="5px" id="admin-company-table">
                    <thead id="admin-table-head">
                        <tr>
                            <th className="admin-company-table-head">Name</th>
                            <th className="admin-company-table-head">Date</th>
                            <th className="admin-company-table-head">Phone Number</th>
                            <th className="admin-company-table-head">Registration Number</th>
                            <th className="admin-company-table-head">Email</th>
                            <th className="admin-company-table-head">Action</th>
                        </tr>
                    </thead>
                    <tbody id="admin-table-body">
                        {companyData.map(company => (
                            <tr key={company.registrationNumber}>
                                <td className="admin-table-company-name">{company.name}</td>
                                <td>{company.register_date}</td>
                                <td>{company.phoneNumber}</td>
                                <td>{company.registrationNumber}</td>
                                <td>{company.email}</td>
                                <td>
                                    {!company.c_status && (
                                        <button onClick={() => handleVerify(company)} className="admin-company-verify-delete admin-company-verify">Verify</button>
                                    )}
                                    <button onClick={() => handleDelete(company)} className="admin-company-verify-delete admin-company-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;