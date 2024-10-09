import React from "react";

const CommunityItem = ({ community }: { community: any }) => {
  return (
    <div className="community-item">
      <h2>{community.name}</h2>
      <p>{community.description}</p>
      <p>Members: {community.membersCount}</p>
    </div>
  );
};

export default CommunityItem;
