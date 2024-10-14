import React, { useState, useEffect } from 'react';
import './styles/adminPage.css';
import DonutChart from './PieChart';
import BarChartComponent from './graph';

const AdminPage = () => {
  return (
    <>
   
    <div className="admin-page" style={{ alignItems: 'center'}}>
      <div className="chart-container">
        <DonutChart />
      </div>
      <div className="chart-container">
        <BarChartComponent />
      </div>
    </div>
   
    </>
  );
};




export default AdminPage;
