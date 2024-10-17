import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/successPage.css';

const SuccessPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');
    const communityId = queryParams.get('communityId');
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
        const joinCommunity = async () => {
            try {
                const response = await axios.post(`http://localhost:3000/community/join/${communityId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 201) {
                    console.log("Successfully joined community!");
                }
            } catch (error) {
                console.error("Error joining community:", error);
            }
        };

        if (sessionId && communityId) {
            joinCommunity();
        }

        const timer = setTimeout(() => {
            navigate('/profile');
        }, 50000); 

        return () => clearTimeout(timer);

    }, [sessionId, communityId, token, navigate]);

    return (
        <div className="success-card">
            <h1>Success!</h1>
            <p>Thank you for your payment. You are being added to the community...</p>
            <div className="loader"></div>
        </div>
    );
};

export default SuccessPage;
