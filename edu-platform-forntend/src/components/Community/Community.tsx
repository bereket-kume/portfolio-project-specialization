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

    const handleJoinCommunity = async (communityId: string) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.post(`http://localhost:3000/community/${communityId}/join`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Successfully joined the community!');
        } catch (error) {
            console.error('Error joining community:', error);
            alert('Failed to join the community. Please try again.');
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
                <ul className="community-list">
                    {communities.map((community) => (
                        <li key={community.id} className={`community-item ${community.isPremium ? 'premium' : 'free'}`}>
                            {community.isPremium && <div className="premium-label">Premium</div>}
                            <h2>{community.name}</h2>
                            <p>{community.description}</p>
                            {community.isPremium && <h2>{`${community.price}$`}</h2>}

                            {community.isPremium ? (
                                <button 
                                    className="checkout-btn"
                                    onClick={() => handlePremiumCheckout(community.id, community.name, community.price!)}
                                >
                                    Pay and Join
                                </button>
                            ) : (
                                <button 
                                    className="join-btn"
                                    onClick={() => handleJoinCommunity(community.id)} 
                                >
                                    Join
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Community;
