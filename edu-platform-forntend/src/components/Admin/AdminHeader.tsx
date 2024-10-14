import React from 'react';
import './styles/adminHeader.css'; 
import { Link, useNavigate } from 'react-router-dom';

const AdminHeader = ({ user, setUser}) => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('authToken');
    setUser(false);
    navigate('/');
  };

  return (
    <aside className="admin-sidebar open"> {/* Sidebar is always open */}
      <div className="admin-sidebar-title">
        <h1>MENU</h1>
      </div>
      <nav>
        <ul className="admin-sidebar-menu">
          <li>
            <Link to='/createCommunity'>Create Community</Link>
          </li>
          <li>
            <Link to='/view-communities'>View Communities</Link>
          </li>
          <li>
            <Link to='/manage-users'>Manage Users</Link>
          </li>
          <button className="signout-btn" onClick={signOut}>Sign out</button>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminHeader;
