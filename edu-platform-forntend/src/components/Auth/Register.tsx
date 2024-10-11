import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './styles/register.css';
import TestimonialSlider from '../Shared/Testimonials';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // To handle loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true); // Set loading to true while waiting for the response

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post('http://localhost:3000/auth/register', formData);
      console.log('User registered:', response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Registration failed. Please try again.'); // Display error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <div className="registration-container">
        <h2>Register</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errorMessage && (
              <p className="confirm-error">{errorMessage}</p>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'} {/* Show loading state */}
          </button>
        </form>
      </div>
      <TestimonialSlider />
    </>
  );
};

export default Registration;
