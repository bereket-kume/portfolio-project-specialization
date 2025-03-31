import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import './styles/AdminPage.css';

interface User {
    name: string;
    email: string;
    role: string;
}

const AdminPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div className="admin-container">
            <AdminHeader setUser={setUser} />
            <main className="admin-content">
                <div className="admin-header">
                    <h1>Welcome, {user?.name || 'Admin'}</h1>
                    <p>Here's what's happening with your communities today.</p>
                </div>

                <div className="admin-stats">
                    <div className="stat-card">
                        <h3>Total Communities</h3>
                        <p className="stat-value">0</p>
                    </div>
                    <div className="stat-card">
                        <h3>Active Users</h3>
                        <p className="stat-value">0</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Revenue</h3>
                        <p className="stat-value">$0</p>
                    </div>
                    <div className="stat-card">
                        <h3>Monthly Growth</h3>
                        <p className="stat-value">0%</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
