import { Link, useNavigate } from 'react-router-dom';
import './styles/Header.css';
import AdminHeader from '../Admin/AdminHeader';
import { useEffect, useState } from 'react';

const Header = ({ user, setUser }) => {
    const navigate = useNavigate();
    const userToken = localStorage.getItem('access_token');

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    const signOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); 
    };

    if (user && user.role === 'ADMIN') {
        return <AdminHeader user={user} setUser={setUser} />;
    }

    return (
        <header className="header">
            <div className="container">
                <h1 className="logo">ConnectSpace</h1>

                <div className="hamburger" onClick={toggleMenu}>
                    ☰
                </div>

                <nav className={`nav ${menuOpen ? 'active' : ''}`}> 
                    <ul>
                        <li><Link to="/">Home</Link></li>
                       
                    </ul>

                    <div className="header-right">
                        {user ? (
                            <>
                                <Link to="/profile">
                                    <img 
                                        src={user.avatar || 'https://via.placeholder.com/40'} 
                                        alt="Profile" 
                                        className="profile-circle"
                                    />
                                </Link>
                                <button className="signout-btn-header" onClick={signOut}>Sign out</button>
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
