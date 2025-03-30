import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomPieChart from './PieChart';
import './styles/AdminPage.css';

const AdminPage = () => {
    const [stats, setStats] = useState({
        freeCommunities: 0,
        premiumCommunities: 0,
        activeUsers: 0,
        inactiveUsers: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const chartData = [
        { name: 'Free Communities', value: stats.freeCommunities },
        { name: 'Premium Communities', value: stats.premiumCommunities },
        { name: 'Active Users', value: stats.activeUsers },
        { name: 'Inactive Users', value: stats.inactiveUsers }
    ];

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="stats-container">
                <div className="stats-card">
                    <h3>Free Communities</h3>
                    <p>{stats.freeCommunities}</p>
                </div>
                <div className="stats-card">
                    <h3>Premium Communities</h3>
                    <p>{stats.premiumCommunities}</p>
                </div>
                <div className="stats-card">
                    <h3>Active Users</h3>
                    <p>{stats.activeUsers}</p>
                </div>
                <div className="stats-card">
                    <h3>Inactive Users</h3>
                    <p>{stats.inactiveUsers}</p>
                </div>
            </div>
            <div className="chart-container">
                <h2>Platform Statistics</h2>
                <CustomPieChart data={chartData} />
            </div>
        </div>
    );
};

export default AdminPage;
