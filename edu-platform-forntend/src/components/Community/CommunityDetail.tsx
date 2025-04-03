import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './styles/communityDetail.css';
import TestimonialSlider from "../Shared/Testimonials";

const CommunityDetail = () => {
  const { communityId } = useParams(); 
  const [community, setCommunity] = useState<{ id: string; name: string; description: string; isPremium: boolean } | null>(null!);
  const [announcements, setAnnouncements] = useState<{ id: string; content: string; communityId: string; creatorName: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCommunityDetails();
    fetchCommunityAnnouncements();
  }, [communityId]);

  const fetchCommunityDetails = async () => {
    try {
      const response = await axios.get(`http://13.60.58.96:3000/community/${communityId}`);
      setCommunity(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching community details.");
      setLoading(false);
    }
  };

  const fetchCommunityAnnouncements = async () => {
    try {
      const response = await axios.get(`http://13.60.58.96:3000/announcements?communityId=${communityId}`);
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
      <div className="community-info">
        <h1>{community?.name}</h1>
        <p>{community?.description}</p>
      </div>

      <div className="announcements-section">
        <h2>Announcements</h2>
        {announcements.length > 0 ? (
          <ul className="announcements-list">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="announcement-item">
                <p>{announcement.content}</p>
                <small>Posted by: {announcement.creatorName}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No announcements yet.</p>
        )}
      </div>

      <TestimonialSlider />
    </div>
  );
};

export default CommunityDetail;
