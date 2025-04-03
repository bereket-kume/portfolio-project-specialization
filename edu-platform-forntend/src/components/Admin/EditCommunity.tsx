import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import './styles/EditCommunity.css';

interface User {
    name: string;
    email: string;
    role: string;
}

interface CommunityFormData {
    name: string;
    description: string;
    type: 'free' | 'premium';
    price?: number;
    category: string;
    imageUrl: string;
}

const EditCommunity: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<CommunityFormData>({
        name: '',
        description: '',
        type: 'free',
        price: 0,
        category: '',
        imageUrl: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCommunity = async (): Promise<void> => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get<CommunityFormData>(`http://13.60.58.96:3000/community/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setFormData(response.data);
            } catch (err) {
                console.error('Error fetching community:', err);
                setError('Failed to fetch community data. Please try again.');
            }
        };

        if (id) {
            void fetchCommunity();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axios.put(`http://13.60.58.96:3000/community/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Community updated:', response.data);
            navigate('/admin/communities');
        } catch (err) {
            console.error('Error updating community:', err);
            setError('Failed to update community. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!id) {
        return <div className="error-message">Invalid community ID</div>;
    }

    return (
        <div className="admin-container">
            <AdminHeader setUser={setUser} />
            <main className="admin-content">
                <div className="edit-community-container">
                    <h1>Edit Community</h1>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit} className="edit-community-form">
                        <div className="form-group">
                            <label htmlFor="name">Community Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="free">Free</option>
                                <option value="premium">Premium</option>
                            </select>
                        </div>

                        {formData.type === 'premium' && (
                            <div className="form-group">
                                <label htmlFor="price">Price ($)</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button type="button" onClick={() => navigate('/admin/communities')} className="cancel-btn">
                                Cancel
                            </button>
                            <button type="submit" disabled={loading} className="submit-btn">
                                {loading ? 'Updating...' : 'Update Community'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditCommunity; 