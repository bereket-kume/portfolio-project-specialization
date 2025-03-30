import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './styles/Header.css';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('access_token');
    const userRole = localStorage.getItem('user_role');

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_role');
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <Link to="/">connectSpace</Link>
                </div>
                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/community">Community</Link>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup" className="signup-btn">Sign Up</Link>
                        </>
                    ) : (
                        <div className="user-menu">
                            <button 
                                className="user-avatar"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <img src="/assets/avatar.png" alt="User avatar" />
                            </button>
                            {isDropdownOpen && (
                                <div className="dropdown-menu">
                                    <Link to="/profile">Profile</Link>
                                    {userRole === 'admin' && (
                                        <Link to="/admin">Admin Panel</Link>
                                    )}
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    )}
                </nav>
                <button 
                    className="mobile-menu-btn"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            {isDropdownOpen && (
                <div className="mobile-menu">
                    <Link to="/">Home</Link>
                    <Link to="/community">Community</Link>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile">Profile</Link>
                            {userRole === 'admin' && (
                                <Link to="/admin">Admin Panel</Link>
                            )}
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
