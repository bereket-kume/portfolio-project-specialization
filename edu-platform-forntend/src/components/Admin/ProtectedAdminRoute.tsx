import { Navigate } from 'react-router-dom';

interface ProtectedAdminRouteProps {
    children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem('access_token');
    const userRole = localStorage.getItem('user_role');

    if (!isAuthenticated || userRole !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedAdminRoute; 