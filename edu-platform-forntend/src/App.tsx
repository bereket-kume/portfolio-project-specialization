import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/Home';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Register';
import Community from './components/Community/Community';
import Header from './components/Shared/Header';
import Profile from './components/User/Profile';

import SuccessPage from './pages/SuccessPage';
import FailurePage from './pages/FailurePage';
import CommunityDetail from './components/Community/CommunityDetail';
import AdminPage from './components/Admin/AdminPage';
import CreateCommunity from './components/Community/CreateCommunity';
import ViewCommunities from './components/Community/ViewCommunities';
import CommunityAdmin from './components/Community/communityAdmin';
function App() {
  const [user, setUser] = useState(null);

  return (

    <Router>
      <Header user={user} setUser={setUser} /> 
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/community' element={<Community />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/profile' element={<Profile user={user} />} />
          <Route path='/signup' element={<Registration />} />
          <Route path="/success" element={<SuccessPage />}/>
          <Route path="/cancel" element={<FailurePage />} />
          <Route path="/community/:communityId" element={<CommunityDetail />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="admin/createCommunity" element={<CreateCommunity />} />
          <Route path='admin/view-communities' element={<ViewCommunities />} />
          <Route path="/community/:communityId/admin" element={<CommunityAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
