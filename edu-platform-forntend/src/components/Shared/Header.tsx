import { Link, useNavigate } from 'react-router-dom';
import './styles/Header.css';
import AdminHeader from '../Admin/AdminHeader';

const Header = ({ user, setUser }) => {
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem('authToken');
        setUser(false);
        navigate('/');
    };

    // Ensure user exists before checking the role
    if (user && user.role === 'ADMIN') {
        return <AdminHeader user={user} setUser={setUser} />;
    }

    return (
        <header className="header">
            <div className="container">
                <h1 className="logo"></h1>
                <nav className="nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
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
