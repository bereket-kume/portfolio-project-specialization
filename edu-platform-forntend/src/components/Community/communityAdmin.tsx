import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './styles/communityAdmin.css';
import AdminHeader from "../Admin/AdminHeader";

const CommunityAdmin = () => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [members, setMembers] = useState([]);  // New state for members
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCommunityDetails();
    fetchCommunityAnnouncements();
    fetchCommunityMembers(); // Fetch members
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

  // Fetch community announcements
  const fetchCommunityAnnouncements = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/announcements?communityId=${communityId}`);
      setAnnouncements(response.data);
    } catch (err) {
      setError("Error fetching community announcements.");
    }
  };

  const fetchCommunityMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/community/${communityId}/members`);
      setMembers(response.data);
    } catch (err) {
      setError("Error fetching community members.");
    }
  };

  const handleAnnouncementChange = (e) => {
    setNewAnnouncement(e.target.value);
  };

  const submitAnnouncement = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(`http://localhost:3000/announcements`, {
        communityId,
        content: newAnnouncement,
        creatorName: "Admin", 
      });
      if (response.status === 201) {
        setSuccess("Announcement posted successfully.");
        setNewAnnouncement("");
        fetchCommunityAnnouncements();
      }
    } catch (err) {
      setError("Error posting announcement.");
    }
  };

  if (loading) {
    return <div>Loading community details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <div className="community-detail-container">
      <div className="community-info">
        <h1>{community?.name}</h1>
        <p>{community?.description}</p>
        {community?.isPremium && <div className="prem-label">Premium Community</div>}
      </div>

      <div className="announcements-section">
        <h2>Announcements</h2>
        <ul className="announcement-list">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
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

      <div className="announcement-form-section">
        <h2>Post a New Announcement</h2>
        <form onSubmit={submitAnnouncement}>
          <textarea
            value={newAnnouncement}
            onChange={handleAnnouncementChange}
            placeholder="Write your announcement..."
            rows="4"
            required
          />
          <button type="submit">Post Announcement</button>
        </form>
        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="members-section">
        <h2>Community Members</h2>
        {members.length > 0 ? (
          <ul className="member-list">
            {members.map((member) => (
              <li key={member.id} className="member-item">
                <p>{member.user.name}</p>
                <p>{member.user.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members found in this community.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default CommunityAdmin;
