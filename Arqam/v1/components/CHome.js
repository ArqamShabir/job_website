import React from 'react';
import { useNavigate } from 'react-router-dom';

function CHome({message}) {

const navigate = useNavigate();

const handleLogout = () => {
    navigate('/CompanyLogin');
};

  return (
    <div>
        {message}
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default CHome