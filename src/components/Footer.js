import React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="site-footer section-padding">
      <Container>
        <Row>
       <Col lg={3} xs={12} className="mb-4 pb-2">
  <a className="navbar-brand" href="/">
    <img className="footerlogo" src="/images/logo3.png" alt="Ons Logo" />
  </a>
</Col>
          <Col lg={3} md={4} xs={6}>
            <h6 className="site-footer-title mb-3">Resources</h6>
            <ul className="site-footer-links">
              <li className="site-footer-link-item">
  <a href="#" className="site-footer-link">Home</a>
</li>
<li className="site-footer-link-item">
  <a href="#section_3" className="site-footer-link">How it works</a>
</li>
<li className="site-footer-link-item">
  <a href="#section_4" className="site-footer-link">FAQs</a>
</li>
<li className="site-footer-link-item">
  <a href="#contact" className="site-footer-link">Contact</a>
</li>
<li className="site-footer-link-item">
                <a href="/Terms" className="site-footer-link">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={4} xs={12} className="mb-4 mb-lg-0">
  <h6 className="site-footer-title mb-3">Information</h6>

  <div className="footer-contact">
    <div className="footer-icon">
      <i className="bi bi-telephone-fill"></i>
    </div>
    <div className="footer-contact-text">
      <h6>Phone</h6>
      <h4>
        <a href="tel:305-240-9671" className="site-footer-link">
          305-240-9671
        </a>
      </h4>
    </div>
  </div>

  <div className="footer-contact">
    <div className="footer-icon">
      <i className="bi bi-envelope-fill"></i>
    </div>
    <div className="footer-contact-text">
      <h6>Email</h6>
      <h4>
        <a href="mailto:info@company.com" className="site-footer-link">
          info@company.com
        </a>
      </h4>
    </div>
  </div>

  <ul className="social">
    <li><a href="#"><i className="bi bi-facebook"></i></a></li>
    <li><a href="#"><i className="bi bi-twitter"></i></a></li>
    <li><a href="#"><i className="bi bi-linkedin"></i></a></li>
    <li><a href="#"><i className="bi bi-instagram"></i></a></li>
  </ul>
</Col>

          <Col lg={3} md={4} xs={12} className="mb-4 mb-lg-0">
      <h6 className="site-footer-title mb-3">Our Services</h6>
      <ul className="site-footer-links">
  <li className="site-footer-link-item">
    Online Therapy Sessions
  </li>
  <li className="site-footer-link-item">
    Child & Adolescent Therapy
  </li>
  <li className="site-footer-link-item">
    Cognitive Behavioral Therapy
  </li>
  <li className="site-footer-link-item">
    Tests using chatbots
  </li>
</ul>

          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;