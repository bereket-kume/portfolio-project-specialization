import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">My Awesome Platform</h1>
                <nav className="nav">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <Link to="/community" className="community-btn">Community</Link> {/* Community Button */}
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                    <Link to="/login" className="login-btn">Signup</Link> {/* Signup Button */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
