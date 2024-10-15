import  { useState } from 'react';
import axios from 'axios';
import './styles/createCommunity.css';

const CreateCommunity = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('access_token'); 

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post(
        'http://localhost:3000/community/create',
        {
          name,
          description,
          isPremium,
          price: isPremium ? parseFloat(price) : 0
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setLoading(false);
      setMessage('Community created successfully!');
      setName('');
      setDescription('');
      setIsPremium(false);
      setPrice('');
    } catch (error) {
      setLoading(false);
      setMessage('Error creating community. Please try again.');
    }
  };

  return (
    <>
      <div className="create-community-container">
        <h1>Create Community</h1>
        {message && <div className={`message ${message.toLowerCase().includes('error') ? 'error' : ''}`}>{message}</div>}
        <form onSubmit={handleSubmit} className="create-community-form">
          <div className="form-group">
            <label htmlFor="name">Community Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group premium-checkbox">
            <label>
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
              />
              Premium Community
            </label>
          </div>
          {isPremium && (
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required={isPremium}
                min="0"
                step="0.01"
                placeholder="Enter price"
              />
            </div>
          )}
          <button type="submit" className="create-community-button" disabled={loading}>
            {loading ? 'Creating...' : 'Create Community'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCommunity;
