import { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import './styles/Community.css';

// Define types for the community object and other variables
interface Community {
    id: string;
    name: string;
    description: string;
    isPremium: boolean;
    price?: number; // Optional price for premium communities
    members: number;
}

const stripePromise = loadStripe("pk_test_51Q7WR407yXrbnphs2Yli0guMG4hgRU808Sqhdc58w4sF0mRZ8Nh7zg973YH2ZK32Xsnz3MgaTXE2xwtwEmgNjCPd00AwiW1G33");

const Community = () => {
    const [communities, setCommunities] = useState<Community[]>([]); // Specify the type of state
    const [loading, setLoading] = useState<boolean>(true); // Boolean type for loading state
    const [error, setError] = useState<string>(""); // Error message as a string

    useEffect(() => {
        fetchCommunities();
    }, []);

    const fetchCommunities = async () => {
        try {
            const response = await axios.get<Community[]>("http://localhost:3000/community"); // Typed response
            setCommunities(response.data);
            setLoading(false);
        } catch (err) {
            setError("Error fetching communities.");
            setLoading(false);
        }
    };

    const handlePremiumCheckout = async (communityId: string, communityName: string, price: number) => {
        try {
            const response = await axios.post("http://localhost:3000/subscription/create-checkout-session", {
                communityId,
                communityName,
                price
            });

            const { sessionId } = response.data;
            const stripe: Stripe | null = await stripePromise;

            if (stripe) {
                const result = await stripe.redirectToCheckout({ sessionId });

                if (result.error) {
                    console.error(result.error.message);
                } else {
                    console.log("Redirecting to Stripe Checkout...");
                }
            }
        } catch (error) {
            console.error("Checkout error:", error);
        }
    };

    const handleJoinCommunity = async (communityId: string, isPremium: boolean, price?: number) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert('Please log in to join a community');
                return;
            }

            if (isPremium) {
                if (!price) {
                    alert('Price information is missing for this premium community');
                    return;
                }
                await handlePremiumCheckout(communityId, communities.find(c => c.id === communityId)?.name || '', price);
            } else {
                const response = await axios.post(`http://localhost:3000/community/join/${communityId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.status === 200) {
                    alert('Successfully joined the community!');
                    fetchCommunities(); // Refresh the communities list
                }
            }
        } catch (error) {
            console.error('Error joining community:', error);
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message || 'Failed to join the community. Please try again.');
            } else {
                alert('Failed to join the community. Please try again.');
            }
        }
    };

    if (loading) {
        return <div>Loading communities...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="community-container">
            {communities.length === 0 ? (
                <p>No communities found.</p>
            ) : (
                <div className="communities-grid">
                    {communities.map((community) => (
                        <div key={community.id} className="community-card">
                            <h3>{community.name}</h3>
                            <p>{community.description}</p>
                            <div className="community-info">
                                <span>Members: {community.members}</span>
                                {community.isPremium && (
                                    <span className="premium-badge">Premium</span>
                                )}
                            </div>
                            <button
                                onClick={() => handleJoinCommunity(community.id, community.isPremium, community.price)}
                                className={`join-button ${community.isPremium ? 'premium' : ''}`}
                            >
                                {community.isPremium ? 'Join Premium' : 'Join Community'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Community;
