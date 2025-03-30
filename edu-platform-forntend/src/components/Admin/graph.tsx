// Importing necessary modules from React and Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './styles/graph.css'

// Sample chart data
const data = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 600 },
  { name: 'Apr', users: 800 },
  { name: 'May', users: 700 },
  { name: 'Jun', users: 900 },
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
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
