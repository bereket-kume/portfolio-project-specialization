import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
    const location = useLocation();

    // Function to extract query parameters
    const getQueryParams = () => {
        return new URLSearchParams(location.search);
    };

    useEffect(() => {
        const queryParams = getQueryParams();
        const sessionId = queryParams.get("session_id");
        const communityId = queryParams.get("communityId"); // Pass communityId in success URL

        if (sessionId && communityId) {
            joinCommunity(communityId);
            console.log("yes")
        }
        console.log("no")
    }, [location]);

    const joinCommunity = async (communityId) => {
        const token = localStorage.getItem("access_token");
        try {
            const response = await axios.post(`http://localhost:3000/community/join/${communityId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Joined community:", response.data);
            alert("Successfully joined the community!");
        } catch (error) {
            console.error("Join community error:", error);
            alert("Failed to join the community. Please try again.");
        }
    };

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your payment. You will be redirected shortly.</p>
        </div>
    );
};

export default SuccessPage;
