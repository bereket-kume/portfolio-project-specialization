import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/Home';
import Login from './components/Auth/Login';
import Registration from './components/Auth/Register';
import Community from './components/Community/Community';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import Profile from './components/User/Profile';
import SuccessPage from './pages/SuccessPage';
import FailurePage from './pages/FailurePage';
import CommunityDetail from './components/Community/CommunityDetail';


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
          <Route path="/community/:communityId" Component={CommunityDetail} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
