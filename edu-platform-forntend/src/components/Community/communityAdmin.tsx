import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './styles/communityAdmin.css';

const CommunityAdmin = () => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState<{ name: string, description: string, isPremium: boolean } | null>(null);
  const [announcements, setAnnouncements] = useState<{ id: string, content: string, creatorName: string }[]>([]);
  const [members, setMembers] = useState<{ id: string, user: { name: string, email: string } }[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCommunityDetails();
    fetchCommunityAnnouncements();
    fetchCommunityMembers();
  }, [communityId]);

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

  const fetchCommunityAnnouncements = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/announcements/community/${communityId}`);
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

  const handleAnnouncementChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewAnnouncement(e.target.value);
  };

  const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmailContent(e.target.value);
  };

  const submitAnnouncement = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(`http://localhost:3000/announcements/create`, {
        communityId,
        content: newAnnouncement,
        creatorID: "670ccd2ef256a97d3bbcf354",
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

  const sendEmailToMembers = async () => {
    setError("");   
    setSuccess("");
    try {
      const memberEmails = members.map(member => member.user.email);
      const response = await axios.post(`http://localhost:3000/email/send`, {
        message: emailContent, 
        communityMembers: memberEmails,
      });
      
      if (response.status === 200) {
        setSuccess("Emails sent successfully.");
        setEmailContent("");
      }
    } catch (err) {
      setError("Error sending emails.");
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
      <div style={{ display: 'flex', flexDirection: 'row', padding: '20px' }} className="cont">
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
                rows={4}
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
  
        <div className="meeting-email-container">
          <textarea
            value={emailContent}
            onChange={handleEmailChange}
            placeholder="Write your email content..."
            rows={6}
            required
          />
          <button onClick={sendEmailToMembers}>Send Email</button>
        </div>
      </div>
    </>
  );
};

export default CommunityAdmin;
