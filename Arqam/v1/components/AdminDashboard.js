import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {

    const [companyData,setCompanyData] = useState([]); 
    const [searchName, setSearchName] = useState('');
    const [searchRegNumber, setSearchRegNumber] = useState('');
   

    const fetchCompanyData = () =>{
        axios.get('http://localhost:3001/AdminDashboard')

        .then(response => {
            setCompanyData(response.data);
        })

        .catch(error =>{
            console.error('There was an error fetching the data',error);
        })

    }

    useEffect( () =>{
        fetchCompanyData();

    } , []);

    const handleVerify = (registrationNumber) =>{
        // axios.post(`http://localhost:3001/admin-dashboard-verify/${registrationNumber}`)

        // .then(response =>{
        //     console.log('Company verified successfully');
        //     //update ui
        // })

        // .catch(error =>{
        //     console.error('Error verifying company:', error);
        //     //display error in ui
        // })

        const confirmed = window.confirm('Are you sure you want to verify this company?');
        if (confirmed) {
          axios.post(`http://localhost:3001/admin-dashboard-verify/${registrationNumber}`)
            .then(response => {
              console.log('Company verified successfully');
              // Refresh company list or update specific company status
              fetchCompanyData(); // Example function to refresh data
              alert('Company verified successfully'); // Temporary alert for visualization
            })
            .catch(error => {
              console.error('Error verifying company:', error);
              alert('Failed to verify company'); // Temporary alert for visualization
            });
        }


    }


    // const handleDelete = (registrationNumber) => {
    //   axios.delete(`http://localhost:3001/admin-dashboard-delete/${registrationNumber}`)
    //     .then(response => {
    //       console.log('Company deleted successfully');
    //       // Refresh company list or remove deleted company from state
    //     })
    //     .catch(error => {
    //       console.error('Error deleting company:', error);
    //       //display in ui
    //     })
    // }

    const handleDelete = (registrationNumber) => {
      const confirmed = window.confirm('Are you sure you want to delete this company?');
      if (confirmed) {
        axios.delete(`http://localhost:3001/admin-dashboard-delete/${registrationNumber}`)
          .then(response => {
            console.log('Company deleted successfully');
            setCompanyData(prevData => prevData.filter(company => company.registrationNumber !== registrationNumber));
            alert('Company deleted successfully'); // Temporary alert for visualization
          })
          .catch(error => {
            console.error('Error deleting company:', error);
            alert('Failed to delete company'); // Temporary alert for visualization
          });
      }
    };

    const handleSearch = () => {
      axios.get('http://localhost:3001/admin-dashboard-search', {
          params: {
              name: searchName, // Assuming searchName holds the name input value
              registrationNumber: searchRegNumber // Assuming searchRegNumber holds the registration number input value
          }
      })
      .then(response => {
          setCompanyData(response.data); // Assuming response.data contains the array of companies
      })
      .catch(error => {
          console.error('Error searching companies', error);
      })
  }
  
  let i = 1;
    return (
        <div className="AdminDashboard">
          <h1>Admin Dashboard</h1>

          <div className="search">
           <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Search by name " />
           <input type="number" value={searchRegNumber} onChange={(e) => setSearchRegNumber(e.target.value)} placeholder="Search by registration number " />
           <button onClick={handleSearch}>Search</button>
          </div>
    
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Date</th>
                <th>Phone Number</th>
                <th>Registration Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {companyData.map(company => {
                 const date = new Date(company.register_date);
                 const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;       
                return(
                <tr key={company.registrationNumber}>
                  <td>{i++}</td>
                  <td>{company.name}</td>
                  <td>{formattedDate}</td>
                  <td>{company.phoneNumber}</td>
                  <td>{company.registrationNumber}</td>
                  <td>{company.email}</td>
                  <td>
                  {company.c_status == 0 ? (
                  <button onClick={() => handleVerify(company.registrationNumber)}>Verify</button>
                  ) : <button disabled>Verified</button>}
                  <button onClick={() => handleDelete(company.registrationNumber)}>Delete</button>
                  </td>
                   
                 
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      );

}

export default AdminDashboard;
