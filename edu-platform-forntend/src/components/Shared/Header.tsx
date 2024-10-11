import { Link, useNavigate } from 'react-router-dom';
import './styles/Header.css';

const Header = ({ user, setUser }) => {
    const navigate = useNavigate();

    const signOut = () => {
        // Clear authentication token or user session here
        localStorage.removeItem('authToken');
        setUser(false);
         // Example: clear auth token from localStorage
        navigate('/'); // Redirect to login page after sign-out
    };

    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">My Awesome Platform</h1>
                <nav className="nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <Link to="/community" className="community-btn">Community</Link>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>

                    <div className="header-right">
                        {user ? (
                            <>
                                <Link to="/profile">
                                    <img 
                                        src={user.avatar || 'https://via.placeholder.com/40'} 
                                        alt="" 
                                        className="profile-circle"
                                    />
                                </Link>
                                <button className="signout-btn" onClick={signOut}>Sign out</button>
                            </>
                        ) : (
                            <Link to="/login" className="login-btn">Signup</Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
