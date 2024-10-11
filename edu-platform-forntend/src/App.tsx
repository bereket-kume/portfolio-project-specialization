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

function App() {
  // State to manage user authentication
  const [user, setUser] = useState(null);

  return (

    <Router>
      <Header user={user} setUser={setUser} /> {/* Pass user and setUser to Header */}
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/community' element={<Community />} />
      <Route path='/login' element={<Login setUser={setUser} />} />
      <Route path='/profile' element={<Profile user={user} />} /> {/* Pass user to Profile */}
      <Route path='/signup' element={<Registration />} />
      <Route path="/success" element={<SuccessPage />}/>
      <Route path="/cancel" element={<FailurePage />} />
  </Routes>
      <Footer />
    </Router>
  );
}

export default App;
