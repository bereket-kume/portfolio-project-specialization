// Importing necessary modules from React and Recharts
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './styles/graph.css'

// Sample chart data
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

// Main React component
const BarChartComponent = () => {
  return (
    <div className="chart-card">
      {/* Card header with title and description */}
      <div className="chart-header">
        <h2>Bar Chart</h2>
        <p>January - June 2024</p>
      </div>

      {/* Chart container */}
      <div className="chart-container">
        {/* Responsive chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} stroke="#ccc" />
            <XAxis dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
            <Tooltip />
            <Bar dataKey="desktop" fill="#8884d8" radius={5} />
            <Bar dataKey="mobile" fill="#82ca9d" radius={5} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Card footer with trending information */}
      <div className="chart-footer">
        <div className="trend-info">
          Trending up by 5.2% this month 
          <span className="trending-icon">📈</span>
        </div>
        <p>Showing total visitors for the last 6 months</p>
      </div>
    </div>
  );
};

export default BarChartComponent;
