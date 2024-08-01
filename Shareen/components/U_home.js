import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import './StyleA.css';
import Header from './Header';
import Footer from './Footer';


const U_home = () => {

    const navigate = useNavigate();

  const [categories, setCategories] = useState([
    { name: 'Salesperson', image: 'food_delivery.svg', openJobs: 0 },
    { name: 'Receptionist', image: 'sweeper.svg', openJobs: 0 },
    { name: 'Watchman', image: 'mzn.png', openJobs: 0 },
    { name: 'Call Operator', image: 'labour.svg', openJobs: 0 },
    { name: 'Other', image: 'other.svg', openJobs: 0 }
  ]);


  useEffect(() => {
    const fetchJobCounts = () => {
      axios.get('http://localhost:3001/open-job-counts')
        .then((response) => {
          const updatedCategories = categories.map(category => {
            const matchingCategory = response.data.find(item => item.category === category.name);
            return matchingCategory
              ? { ...category, openJobs: matchingCategory.count }
              : category;
          });
          setCategories(updatedCategories);
        })
        .catch((error) => {
          console.error('There was an error fetching the job counts', error);
        });
    };
    fetchJobCounts();
  }, []);

  const handleCategoryClick = (categoryName) => {
    localStorage.setItem('categoryName', categoryName);
    navigate(`/HomePage2/${categoryName}`);
  };

  return (

    <div>
    <Header />

    <div className="u_home_main">
            <div className="row1">
              <div className="box1" style={{ marginTop: '40px' }}>
                    <h1>Find a job that suits<br /> your interest & skills.</h1>
                    <p>We provide the best non-technical jobs in all cities and companies<br />
                        of Pakistan. Be ready for your next job.</p>

              </div> 
              
                <div className="box2">
                    <img src="Illustration.png" alt="" />
                </div>

            </div>

            <div className="row2">

                <div className="dis1">
                    <img src="Iconbox.png" alt="" />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '6px 0' }}>
                        <h3 style={{ fontWeight: 500 }}>1,75,324</h3>
                        <h5>Live Job</h5>
                    </div>
                </div>

                <div className="dis1" style={{ boxShadow: '0 0px 20px #002c6d31', border: '1px solid #002c6d1c', backgroundColor: '#fff', borderRadius: '8px' }}>
                    <img src="Iconbox2.png" alt="" />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '6px 0' }}>
                        <h3 style={{ fontWeight: 500 }}>97,354</h3>
                        <h5>Companies</h5>
                    </div>
                </div>

                <div className="dis1">
                    <img src="Iconbox3.png" alt="" />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '6px 0' }}>
                        <h3 style={{ fontWeight: 500 }}>38,47,154</h3>
                        <h5>Candidates</h5>
                    </div>
                </div>

            </div>

        </div>

    
      <div className="u_home_main_categories">
          <h1>Popular Categories</h1>
          <div className="category-row-1">
            {categories.map((category, index) => (
              <div key={index}className="cat1" id="job-category" onClick={() => handleCategoryClick(category.name)}>
                <img src={category.image} alt={category.name} />
                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',padding: '6px 0',gap: '5px'}}>
                  <h3 style={{ fontWeight: 500 }}>{category.name}</h3>
                  <h5>Open position{category.openJobs === 1 ? '' : 's'} ({category.openJobs})</h5>
                </div>
              </div>
            ))};
          </div>
    </div>
    <Footer />
  </div>
           
  );
};

export default U_home;
