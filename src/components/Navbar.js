import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbars = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in by checking localStorage
  useEffect(() => {
    const checkUserData = () => {
      const userData = localStorage.getItem('UserData');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          // Check if userData exists and has some meaningful data
          setIsLoggedIn(parsedData && Object.keys(parsedData).length > 0);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUserData();

    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkUserData);

    return () => {
      window.removeEventListener('storage', checkUserData);
    };
  }, []);

  // Handle scroll effect for navbar
  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation and scrolling to a section
  const handleSectionScroll = (page, sectionId) => {
    navigate(`${page}?section=${sectionId}`);
  };

  // Handle scrolling when the page loads with a section query parameter
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sectionId = query.get('section');
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('UserData');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Navbar expand="lg" className={`navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`} fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/images/logo5.png" title="logo" className="navbar-logo" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown id="basic-nav-dropdown" title={<Link to="/">Home</Link>}>
              <NavDropdown.Item onClick={() => handleSectionScroll('/', 'why-anas')}>
                Why Ons?
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSectionScroll('/', 'our-services')}>
                Our Services
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSectionScroll('/', 'section_3')}>
                How does it work
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSectionScroll('/', 'section_4')}>
                F&Q
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSectionScroll('/', 'carouselExample2Controls')}>
                Reviews
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSectionScroll('/', 'contact')}>
                Contact Us
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
            <Nav.Link as={Link} to="/posts">Post</Nav.Link>

            <NavDropdown title={<Link to="/blog">Blog</Link>}>
              <NavDropdown.Item onClick={() => handleSectionScroll('/blog', 'articles')}>
                Articles
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSectionScroll('/blog', 'video')}>
                Videos
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/booking">Booking</Nav.Link>

            {/* Conditional rendering based on login status */}
            {isLoggedIn ? (
              <Nav.Link onClick={handleLogout}>
                <button className="login-btn">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Logout
                </button>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                <button className="login-btn">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Login
                </button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;