import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/adminPage.css';
import AdminHeader from './AdminHeader';
import DonutChart from './PieChart';
import BarChartComponent from './graph';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

 

 



  return (
    <>
    {/* <div className="admin-page">
      <AdminHeader />
    </div> */}
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
    <div> <DonutChart /></div>
   
    <div ><BarChartComponent /></div>
    </div>
    </>
  );
};

export default AdminPage;
