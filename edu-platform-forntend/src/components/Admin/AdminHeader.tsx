// AdminHeader.js
import React from 'react';
import './styles/adminHeader.css'; 
import { Link, useNavigate } from 'react-router-dom';

const AdminHeader = ({ user, setUser }) => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('authToken');
    setUser(false);
    navigate('/');
  };

  return (
    <header className="admin-header">
      <div >

      <section className="admin-banner">
        <h1>We are here to connect the community</h1>
      </section>
      <section className="admin-sub-banner">
        <h2>Take control of your community with real-time insights and data management</h2>
      </section>
      </div>
      
      <aside className="admin-sidebar open"> {/* Sidebar is always open */}
        <div className="admin-sidebar-title">
          <h1>MENU</h1>
        </div>
        <nav>
          <ul className="admin-sidebar-menu">
            <li>
              <Link to='/admin'>Home</Link>
            </li>
            <li>
              <Link to='/admin/createCommunity'>Create Community</Link>
            </li>
            <li>
              <Link to='/admin/view-communities'>View Communities</Link>
            </li>
           
            <button className="signout-btn" onClick={signOut}>Sign out</button>
          </ul>
        </nav>
      </aside>
    </header>
  );
};

export default AdminHeader;
