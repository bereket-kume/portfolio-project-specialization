import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import './styles/ManageCommunities.css';

interface User {
    name: string;
    email: string;
    role: string;
}

interface Community {
    id: string;
    name: string;
    description: string;
    type: 'free' | 'premium';
    price?: number;
    category: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

const ManageCommunities: React.FC = () => {
    const [, setUser] = useState<User | null>(null);
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchCommunities = async (): Promise<void> => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get<Community[]>('http://13.60.58.96:3000/community', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setCommunities(response.data);
            } catch (err) {
                console.error('Error fetching communities:', err);
                setError('Failed to fetch communities. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        void fetchCommunities();
    }, []);

    const handleDelete = async (id: string): Promise<void> => {
        if (!window.confirm('Are you sure you want to delete this community?')) {
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            await axios.delete(`http://13.60.58.96:3000/community/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setCommunities(prevCommunities => prevCommunities.filter(community => community.id !== id));
        } catch (err) {
            console.error('Error deleting community:', err);
            setError('Failed to delete community. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="admin-container">
                <AdminHeader setUser={setUser} />
                <main className="admin-content">
                    <div className="loading">Loading communities...</div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-container">
                <AdminHeader setUser={setUser} />
                <main className="admin-content">
                    <div className="error-message">{error}</div>
                </main>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <AdminHeader setUser={setUser} />
            <main className="admin-content">
                <div className="manage-communities-container">
                    <div className="manage-communities-header">
                        <h1>Manage Communities</h1>
                        <Link to="/admin/communities/create" className="create-btn">
                            Create New Community
                        </Link>
                    </div>

                    <div className="communities-list">
                        {communities.length === 0 ? (
                            <div className="no-communities">
                                <p>No communities found. Create one to get started!</p>
                            </div>
                        ) : (
                            communities.map(community => (
                                <div key={community.id} className="community-card">
                                    <div className="community-info">
                                        <h3>{community.name}</h3>
                                        <p>{community.description}</p>
                                        <div className="community-meta">
                                            <span className={`community-type ${community.type}`}>
                                                {community.type}
                                            </span>
                                            {community.type === 'premium' && (
                                                <span className="community-price">
                                                    ${community.price}
                                                </span>
                                            )}
                                            <span className="community-category">
                                                {community.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="community-actions">
                                        <Link to={`/admin/communities/edit/${community.id}`} className="edit-btn">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => void handleDelete(community.id)}
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManageCommunities; 