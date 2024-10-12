import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './styles/communityDetail.css';
import TestimonialSlider from "../Shared/Testimonials";

const CommunityDetail = () => {
  const { communityId } = useParams(); // Get communityId from URL parameters
  const [community, setCommunity] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCommunityDetails();
    fetchCommunityAnnouncements();
  }, [communityId]);

  // Fetch community details
  const fetchCommunityDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/community/${communityId}`);
      setCommunity(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching community details.");
      setLoading(false);
    }
  };

  // Fetch announcements for the specific community
  const fetchCommunityAnnouncements = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/announcements?communityId=${communityId}`);
      setAnnouncements(response.data);
    } catch (err) {
      setError("Error fetching community announcements.");
    }
  };

  if (loading) {
    return <div>Loading community details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="community-detail-container">
      {/* Community Information */}
      <div className="community-info">
        <h1>{community?.name}</h1>
        <p>{community?.description}</p>
        {community?.isPremium && <div className="prem-label">Premium Community</div>}
      </div>

      {/* Announcements Section */}
      <div className="announcements-section">
        <h2>Announcements</h2>
        <ul className="announcement-list">
          {announcements.length > 0 ? (
            announcements
              .filter(announcement => announcement.communityId === community.id)
              .map((announcement) => (
                <li key={announcement.id} className="announcement-item">
                  <p>{announcement.content}</p>
                  <small>Posted by: {announcement.creatorName}</small>
                </li>
              ))
          ) : (
            <li>No announcements found for this community.</li>
          )}
        </ul>
      </div>

      {/* Additional Section - Example: Recent Members */}
      <div className="additional-section">
        <h2>Recent Members</h2>
        <ul className="members-list">
          {/* Example members - replace with API data */}
          <li>John Doe</li>
          <li>Jane Smith</li>
          <li>Chris Johnson</li>
        </ul>
      </div>
      <TestimonialSlider />
    </div>
  );
};

export default CommunityDetail;
