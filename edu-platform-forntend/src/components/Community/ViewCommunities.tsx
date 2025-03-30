import { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/ViewCommunities.css';

interface Community {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  price?: number;
}

const ViewCommunities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get<Community[]>('http://localhost:3000/community');
      setCommunities(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching communities');
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    window.location.href = `/admin/community/edit/${id}`;
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this community?')) {
      try {
        await axios.delete(`http://localhost:3000/community/${id}`);
        setCommunities(communities.filter(community => community.id !== id));
      } catch (err) {
        console.error('Error deleting community:', err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="communities-container">
      <h2>Communities</h2>
      <div className="communities-grid">
        {communities.map((community) => (
          <div key={community.id} className="community-card">
            <h3>{community.name}</h3>
            <p>{community.description}</p>
            <div className="community-actions">
              <button onClick={() => handleEdit(community.id)}>Edit</button>
              <button onClick={() => handleDelete(community.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCommunities;
