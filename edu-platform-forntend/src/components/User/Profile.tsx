import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile/styles.css'
import { Link } from 'react-router-dom';

const Profile = () => {
    const [userProfile, setUserProfile] = useState<{ name: string, email: string, joinedCommunities: { id: number, name: string }[] } | null>(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access_token'); // Assuming you store the token in localStorage

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserProfile(response.data);
            } catch (err) {
                
            }
        };

        fetchProfile();
    }, [token]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div className="profile-container">
            {/* User Profile Information */}
            <div className="profile-info">
                <h1>{userProfile.name}</h1>
                <p>Email: {userProfile.email}</p>
            </div>

            {/* Joined Communities */}
            <div className="joined-communities">
                <h2>Joined Communities:</h2>
                <ul>
                    {userProfile.joinedCommunities.length > 0 ? (
                        <ul>
                        {userProfile.joinedCommunities.map((community) => (
                          <li key={community.id}>
                            <Link to={`/community/${community.id}`}>{community.name}</Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                        <li>No communities joined yet.</li>
                    )}
                </ul>
            </div>
        </div>
        <section className="intro-section">
    <div className="container">
        

        {/* New Div Below the Intro Content */}
        <div className="intro-extra-content m-10">
            <div className="extra-text">
                <h3>Why Our Community is Different</h3>
                <p>We focus on meaningful connections, bringing together creators and like-minded individuals. Whether you want to share ideas or collaborate on projects, our platform is the perfect place to grow together.</p>
                <p>Join us today and experience a community built on trust, creativity, and innovation.</p>
            </div>
            <div className="extra-features">
                <div className="feature">
                    <i className="fas fa-hands-helping"></i>
                    <h4>Supportive Environment</h4>
                    <p>Our community is all about helping one another, fostering growth, and creating opportunities.</p>
                </div>
                <div className="feature">
                    <i className="fas fa-lightbulb"></i>
                    <h4>Innovative Ideas</h4>
                    <p>Find and share creative ideas with others who are just as passionate as you are.</p>
                </div>
            </div>
        </div>

        <div className="intro-content">
            {/* Left: Image */}
            <div className="intro-image">
                <img src="/images/community2.jpg" alt="Community" />
            </div>
            {/* Right: Friendly Text */}
            
        </div>
    </div>
</section>

        </>
    );
};

export default Profile;
