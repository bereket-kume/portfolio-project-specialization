import './styles/AdminHeader.css';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AdminHeaderProps {
  setUser: (user: User | null) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <aside className="admin-sidebar"> 
      <div className="admin-sidebar-title">
        <h1>MENU</h1>
      </div>
      <nav>
        <ul className="admin-sidebar-menu">
          <li>
            <Link to='/admin'>Dashboard</Link>
          </li>
          <li>
            <Link to='/admin/communities'>Manage Communities</Link>
          </li>
          <li>
            <Link to='/admin/communities/create'>Create Community</Link>
          </li>
          <li>
            <Link to='/admin/users'>Manage Users</Link>
          </li>
          <li>
            <Link to='/admin/settings'>Settings</Link>
          </li>
          <li>
            <button className="signout-btn" onClick={handleSignOut}>Sign out</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminHeader; 