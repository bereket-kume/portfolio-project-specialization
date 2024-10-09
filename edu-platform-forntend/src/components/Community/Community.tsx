import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles/Community.css'; // Assuming you have some CSS styles
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import Testimonial from "../Shared/Testimonials";

const Community = () => {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch communities from the API
    const fetchCommunities = async () => {
        try {
            const response = await axios.get("http://localhost:3000/community"); // Change to your API endpoint
            setCommunities(response.data);
            setLoading(false);
        } catch (err) {
            setError("Error fetching communities.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCommunities();
    }, []);

    if (loading) {
        return <div>Loading communities...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
        <Header />
          
        <section className="blur-bg-section">
            <div className="blur-content">
                <h2>Welcome to Our Community</h2>
                <p>Join like-minded individuals and grow together in a space designed for collaboration and support.</p>
                <a href="/signup" className="btn-primary">Join Now</a>
            </div>
        </section>

        <div className="community-container">
            {communities.length === 0 ? (
                <p>No communities found.</p>
            ) : (
                <ul className="community-list">
                    {communities.map((community) => (
                        <li key={community.id} className={`community-item ${community.isPremium ? 'premium' : 'free'}`}>
                            {community.isPremium && (
                                <div className="premium-label">Premium</div>
                            )}
                            <h2>{community.name}</h2>
                            <p>{community.description}</p>
                           {community.isPremium && (
                            <h2>{`${community.price}$`}</h2>
                           )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <Testimonial />
        <Footer />
        </>
    );
};

export default Community;
