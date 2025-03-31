import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/Home';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Register';
import Community from './components/Community/Community';
import Header from './components/Shared/Header';
import Profile from './components/User/Profile';
import Footer from './components/Shared/Footer';
import SuccessPage from './pages/SuccessPage';
import FailurePage from './pages/FailurePage';
import CommunityDetail from './components/Community/CommunityDetail';
import AdminPage from './components/Admin/AdminPage';
import CreateCommunity from './components/Admin/CreateCommunity';
import ManageCommunities from './components/Admin/ManageCommunities';
import EditCommunity from './components/Admin/EditCommunity';
import CommunityAdmin from './components/Community/communityAdmin';
import ProtectedAdminRoute from './components/Admin/ProtectedAdminRoute';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

interface User {
  email: string;
  role: string;
  avatar?: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/community" element={<Community />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/signup" element={<Registration />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/cancel" element={<FailurePage />} />
              <Route path="/community/:communityId" element={<CommunityDetail />} />
              
              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedAdminRoute>
                  <AdminPage />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/communities/create" element={
                <ProtectedAdminRoute>
                  <CreateCommunity />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/communities" element={
                <ProtectedAdminRoute>
                  <ManageCommunities />
                </ProtectedAdminRoute>
              } />
              <Route path="/admin/communities/edit/:id" element={
                <ProtectedAdminRoute>
                  <EditCommunity />
                </ProtectedAdminRoute>
              } />
              
              <Route path="/community/:communityId/admin" element={<CommunityAdmin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
