import { useEffect, useState } from 'react';
import axios from 'axios';
import './profile/styles.css'
import { Link } from 'react-router-dom';

interface User {
  email: string;
  role: string;
  avatar?: string;
}

interface Community {
  id: string;
  name: string;
}

interface UserProfile {
  name: string;
  email: string;
  joinedCommunities: Community[];
}

interface ProfileProps {
  user: User | null;
}

const Profile: React.FC<ProfileProps> = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get<UserProfile>('http://13.60.58.96:3000/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserProfile(response.data);
            } catch (err) {
                setError('Failed to fetch user profile');
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
            <div className="profile-info">
                <h1>{userProfile.name}</h1>
                <p>Email: {userProfile.email}</p>
            </div>

            <div className="joined-communities">
                <h2>Joined Communities:</h2>
                <ul>
                    {userProfile.joinedCommunities.length > 0 ? (
                        <ul>
                            {
                                userProfile.joinedCommunities
                                    .reduce((uniqueCommunities, currentCommunity) => {
                                        if (!uniqueCommunities.some(community => community.id === currentCommunity.id)) {
                                            uniqueCommunities.push(currentCommunity);
                                        }
                                        return uniqueCommunities;
                                    }, [] as Community[])
                                    .map((community) => (
                                        <li key={community.id}>
                                            <Link to={`/community/${community.id}`}>{community.name}</Link>
                                        </li>
                                    ))
                            }
                        </ul>
                    ) : (
                        <li>No communities joined yet.</li>
                    )}
                </ul>
            </div>
        </div>
        <section className="intro-section">
            <div className="container">
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
                    <div className="intro-image">
                        <img src="/images/community2.jpg" alt="Community" />
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Profile; 