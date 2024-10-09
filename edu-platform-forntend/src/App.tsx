import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './components/Auth/Login';
import Community from './components/Community/Community';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/community' element={<Community />} /> 
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
