import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card, Accordion, Carousel } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';


const Home = () => {
  const [counters, setCounters] = useState([0, 0, 0]);
  const targetCounters = [80, 60, 50];
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCounters([0, 0, 0]);
          const interval = setInterval(() => {
            setCounters((prev) =>
              prev.map((count, index) =>
                count < targetCounters[index] ? Math.min(count + 1, targetCounters[index]) : count
              )
            );
          }, 50);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const mainTimelineContainer = document.querySelector('.timeline-container');
      if (mainTimelineContainer) {
        const mainTimelineContainerBottom =
          mainTimelineContainer.getBoundingClientRect().bottom - window.innerHeight * 0.5;
        mainTimelineContainer.querySelector('.inner').style.height = `${mainTimelineContainerBottom}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      {/* Header Section */}
      <header className="header-section">
        <video
          className="header-video"
          src="/images/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          alt="Header Video"
        />
      </header>

      {/* Why Ons? Section */}
      <section className="why-anas"  id="why-anas" ref={sectionRef}>
        <Container>
          <h2>Why Ons?</h2>
          <p className="intro">
            At Ons, we believe mental health is just as important as physical health. Our mission is to provide psychological support through innovative techniques and tailored resources to meet your needs.
          </p>
          <div className="benefits">
            <div className="benefit">
              <h3>{counters[0]}%+</h3>
              <h4>Access Barriers</h4>
              <p>80% of people in the Arab world face barriers to accessing mental health care due to stigma or lack of resources, highlighting the need for accessible platforms like Ons.</p>
            </div>
            <div className="benefit">
              <h3>{counters[1]}%+</h3>
              <h4>Youth Stress</h4>
              <p>Over 60% of youth in the Arab world report experiencing stress or anxiety, underscoring the importance of early intervention tools like Ons' chatbot and assessments.</p>
            </div>
            <div className="benefit">
              <h3>{counters[2]}%+</h3>
              <h4>Undiagnosed Issues</h4>
              <p>50% of mental health issues in the Arab world go undiagnosed due to limited awareness, making Ons' educational resources vital for empowerment.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Services Section */}
      <section className="sc-articles" id="our-services">
        <Container>
          <div className="title-box text-center">
            <div className="content-wrapper">
              <h2 className="title-box-name">
                <b>Our Services!</b>
              </h2>
              <div className="title-separator mx-auto"></div>
            </div>
          </div>
          <div className="articles-list d-flex flex-wrap justify-content-center">
            <article className="articles-item">
              <div className="item-img">
                <img src="/images/Chat.jpg" alt="Chatbot" />
              </div>
              <div className="item-body">
                <div className="item-title">Chatbot</div>
                <p className="text">
                  The chatbot responds to inquiries, provides psychological assessments, and delivers results to help users gain insights into their mental health.
                </p>
                <Link to="/chat" className="item-link text-blue d-flex align-items-baseline">
                  <button className="home-service-button">
                    Start Now!
                    <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </article>
            <article className="articles-item">
              <div className="item-img">
                <img src="/images/blog.png" alt="Blogs" />
              </div>
              <div className="item-body">
                <div className="item-title">Blog</div>
                <p className="text">
                  Our blog offers articles and videos on various mental health topics, providing valuable insights and resources to support users on their wellness journey.
                </p>
                <Link to="/blog" className="item-link text-blue d-flex align-items-baseline">
                  <button className="home-service-button">
                    Show!
                    <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </article>
            <article className="articles-item">
              <div className="item-img">
                <img src="/images/Doc.jpg" alt="Doctors" />
              </div>
              <div className="item-body">
                <div className="item-title">Doctors</div>
                <p className="text">
                  We offer appointment bookings and medical consultations with specialists, featuring the convenience of online video sessions.
                </p>
                <Link to="/booking" className="item-link text-blue d-flex align-items-baseline">
                  <button className="home-service-button">
                    Show!
                    <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="timeline-section section-padding" id="section_3" style={{ backgroundImage: `url('/images/pd.png')` }}>
        <div className="section-overlay"></div>
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <h2>How does it work?</h2>
            </Col>
            <Col lg={10} xs={12} className="mx-auto">
              <div className="timeline-container">
                <ul className="vertical-scrollable-timeline" id="vertical-scrollable-timeline">
                  <div className="list-progress">
                    <div className="inner"></div>
                  </div>
                  <li>
                    <h4 className="text-white mb-3">Sign Up</h4>
                    <p className="text-white">
                      Log into your account to unlock all the features available on the platform.
                    </p>
                    <div className="icon-holder">
                      <i className="bi bi-person-plus-fill"></i>
                    </div>
                  </li>
                  <li>
                    <h4 className="text-white mb-3">Psychological Tests & Chatbot Guidance</h4>
                    <p className="text-white">
                      Take personalized psychological assessments to gain insight into your mental health and get advice from our AI-powered chatbot.
                    </p>
                    <div className="icon-holder">
                      <i className="bi bi-chat-dots-fill"></i>
                    </div>
                  </li>
                  <li>
                    <h4 className="text-white mb-3">Doctor Consultations</h4>
                    <p className="text-white">
                      Connect with mental health professionals nearby and book either online consultations or in-person appointments.
                    </p>
                    <div className="icon-holder">
                      <i className="bi bi-person-heart"></i>
                    </div>
                  </li>
                  <li>
                    <h4 className="text-white mb-3">Educational Resources</h4>
                    <p className="text-white">
                      Access a variety of articles and videos to expand your knowledge on mental health and well-being.
                    </p>
                    <div className="icon-holder">
                      <i className="bi bi-book-fill"></i>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={12} className="text-center mt-5">
              <p className="text-white">
                Want to Start your journey?
                <Link to="/booking" className="home-timeline-button">
                  Let's Go
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section-padding" id="section_4">
        <Container>
          <Row>
            <Col lg={12} xs={12} className="text-center">
              <h2>Frequently Asked Questions</h2>
            </Col>
            <Col lg={5} xs={12}>
              <img src="/images/fq.png" alt="FAQ" className="img-fluid" />
            </Col>
            <Col lg={7} xs={12} className="m-auto">
              <Accordion id="accordionExample" defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>What is "Ons" and how can it help me?</Accordion.Header>
                  <Accordion.Body>
                    "Ons" is a mental health platform designed to support users in understanding and improving their mental well-being. Through psychological assessments, educational resources, and expert guidance, our platform provides personalized recommendations and helps connect users with nearby mental health professionals.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Are the consultations with professionals confidential?</Accordion.Header>
                  <Accordion.Body>
                    Yes, all consultations are fully confidential and meet privacy standards to ensure a safe space for users. We prioritize your privacy and follow strict data protection policies.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>How can I find mental health resources specific to my concerns?</Accordion.Header>
                  <Accordion.Body>
                    Ons' AI-powered recommendations help you explore content based on your interests and assessments, including videos, articles, and exercises tailored to your needs.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Reviews Section */}
      <section className="client_section layout_padding-bottom" id="carouselExample2Controls" >
        <Container>
          <div className="heading_container text-center">
            <h2>Reviews</h2>
          </div>
          <Carousel id="carouselExample2Controls" interval={1000} pause="hover">
            <Carousel.Item>
              <Row>
                <Col md={11} lg={10} className="mx-auto">
                  <div className="box">
                    <div className="img-box">
                      <img src="/images/Rev1.png" alt="Aliaa" />
                    </div>
                    <div className="detail-box">
                      <div className="name">
                        <h6>Aliaa</h6>
                      </div>
                      <p>
                        "This site is a real treasure! The support is there for everyone and interactors to make it convenient for them to share and learn. The self-assessment tools have been very helpful to me. Thanks for the work!"
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>
                <Col md={11} lg={10} className="mx-auto">
                  <div className="box">
                    <div className="img-box">
                      <img src="/images/Rev2.png" alt="Ali" />
                    </div>
                    <div className="detail-box">
                      <div className="name">
                        <h6>Ali</h6>
                      </div>
                      <p>
                        "The mental health website has had a huge positive impact on my life. The information provided is clear and comprehensive, and the support available from professionals has been extremely helpful. I highly recommend it to anyone looking to improve their mental health!"
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row>
                <Col md={11} lg={10} className="mx-auto">
                  <div className="box">
                    <div className="img-box">
                      <img src="/images/Rev3.jpg" alt="Ahmad" />
                    </div>
                    <div className="detail-box">
                      <div className="name">
                        <h6>Ahmad</h6>
                      </div>
                      <p>
                        "The mental health website has valuable information, but I would like to see more videos and webinars. Overall, a very good resource to help with your mental health journey."
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
          <div className="carousel_btn-container">
            <a className="carousel-control-prev" href="#carouselExample2Controls" role="button" data-bs-slide="prev">
              <i className="bi bi-arrow-left"></i>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExample2Controls" role="button" data-bs-slide="next">
              <i className="bi bi-arrow-right"></i>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </Container>
      </section>

      {/* Contact Us Section */}
      <section className="contact_section layout_padding" id="contact">
        <Container>
          <div className="heading_container text-center">
            <h2>Get In Touch</h2>
          </div>
          <Row>
            <Col md={6}>
              <div className="form_container contact-form">
                <input type="text" className="form-control" placeholder="Your Name" required />
                <input type="text" className="form-control" placeholder="Phone Number" required />
                <input type="email" className="form-control" placeholder="Email" required />
                <textarea className="form-control message-box" placeholder="Message" rows="6" required></textarea>
                <div className="btn_box">
                  <button type="button" className="home-send-button">
                    SEND
                  </button>
                </div>
              </div>
            </Col>
            <Col md={6} className="mt-5 mt-md-0">
              <iframe
                className="google-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2595.065641062665!2d-122.4230416990949!3d37.80335401520422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858127459fabad%3A0x808ba520e5e9edb7!2sFrancisco%20Park!5e1!3m2!1sen!2sth!4v1684340239744!5m2!1sen!2sth"
                width="100%"
                height="400"
                style={{ border: 0 }}
                title="Google Map"
              ></iframe>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default Home;