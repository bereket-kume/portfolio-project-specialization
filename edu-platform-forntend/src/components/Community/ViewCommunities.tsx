import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/viewCommunities.css';
import AdminHeader from '../Admin/AdminHeader';
import { Link } from 'react-router-dom';
import Community from './Community';

const ViewCommunities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get('http://localhost:3000/community');
      setCommunities(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching communities.');
      setLoading(false);
    }
  };

  const deleteCommunity = async (id: any) => {
    const confirmed = window.confirm('Are you sure you want to delete this community?');
    if (!confirmed) return; 

    try {
      await axios.delete(`http://localhost:3000/community/${id}/delete`);
      fetchCommunities(); 
    } catch (err) {
      setError('Error deleting community.'); 
    }
  };

  if (loading) {
    return <div>Loading communities...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="view-communities-container">
        <h1>Community List</h1>
        <table className="communities-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {communities.length > 0 ? (
              communities.map((community) => (
                <tr key={community.id}>
                  <td>{community.name}</td>
                  <td>{community.description}</td>
                  <td>{community.isPremium ? 'Premium' : 'Regular'}</td>
                  <td>
                    <Link to={`/community/${community.id}/admin`}>
                      <button className="action-button view">View</button>
                    </Link>
                    <button className="action-button edit">Edit</button>
                    <button 
                      className="action-button delete" 
                      onClick={() => deleteCommunity(community.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No communities found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewCommunities;
