import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Booking from './pages/Booking';
import BookingForm from './pages/BookingForm';
import Terms from './pages/Terms';
import DoctorProfile from './pages/DoctorProfile';
import UserProfile from './pages/UserProfile';
import BlogPage from './pages/Blog';
import PostsPage from './pages/Postes';
import LoginSignup from './pages/LoginSignup';
import Admin from './pages/Admin';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />


        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/blog" element={<BlogPage />} />


        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;