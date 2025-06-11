import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Blog.css';


const BlogPage = () => {
  return (
    <div className="blog-page">
      <Navbar />
      <section className="section-padding">
        <Container>
          <Row>
            <Col>
              <h2>Articles</h2>
              <div className="articles-container">
                {[
                  {
                    title: 'Anxiety and Panic',
                    image: '/images/Screenshot 2024-10-27 233525.png',
                    text: '“Anxiety is a feeling that robs you of moments of comfort…”',
                    link: 'https://www.uplife.app/post/how-to-eliminate-anxiety',
                  },
                  {
                    title: 'Mood disorders',
                    image: '/images/83b22d679b209f5f7bfa9cd3ad0712d6.jpg',
                    text: 'A mood disorder is a mental health condition...',
                    link: 'https://www.mayoclinic.org/diseases-conditions/mood-disorders/symptoms-causes/syc-20365057',
                  },
                  {
                    title: 'Childhood and developmental disorders',
                    image: '/images/33c22032702ebd30158eb8f1358e5de1.jpg',
                    text: 'Spectrum disorder, ADHD, Tic disorder...',
                    link: 'https://pubmed.ncbi.nlm.nih.gov/23869393/',
                  },
                  {
                    title: 'Obsessive-compulsive disorder',
                    image: '/images/893b7cec3885cd83f6ea1649e733a0f7.jpg',
                    text: 'Compulsions are behaviors that the sufferer performs...',
                    link: 'https://pubmed.ncbi.nlm.nih.gov/23869393/',
                  },
                ].map((article, idx) => (
                  <div className="article-item" key={idx}>
                    <img src={article.image} alt={article.title} className="article-image" />
                    <div className="article-content">
                      <h3><b>{article.title}</b></h3>
                      <p>{article.text}</p>
                      <a href={article.link} className="blog-article-button" target="_blank" rel="noreferrer">
                        <b>Read More</b>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding chat-banner">
        <Container className="text-center">
          <p className="text-p">
            Feeling sad? No one to share your feelings with? Talk to our interactive chatbot.
          </p>
          <Link to="/chat" className="blog-chat-button">
            Start now
          </Link>
        </Container>
      </section>

      <section className="section-padding" id="video">
        <Container>
          <Row>
            <Col>
              <h1>Videos!</h1>
              <div className="grid">
                {[
                  {
                    title: 'A Mindfulness Exercise to Calm Your Emotions',
                    src: '/images/Heartbeat_ A Mindfulness Exercise to Calm Your Emotions.mp4',
                    text: 'This quick mindfulness exercise can help to calm your emotions...',
                  },
                  {
                    title: 'What is Depression?',
                    src: '/images/What is Depression_.mp4',
                    text: 'This video provides an overview of what depression actually is...',
                  },
                  {
                    title: 'What is Mental Health?',
                    src: '/images/vid66.mp4',
                    text: 't’s more than just the absence of illness ,it’s about well-being, resilience, and living a fulfilling life..',
                  },
                  {
                    title: '8 Habits to Boost Your Mental Health',
                    src: '/images/vid77.mp4',
                    text: 'Simple daily actions like good posture, positive thinking...',
                  },
                  {
                    title: 'Its Okay to Not Be Okay',
                    src: '/images/vid88.mp4',
                    text: 'ental health affects everyone Its okay to feel down, stressed, or overwhelmed.',
                  },
                  {
                    title: 'Break the Stigma',
                    src: '/images/vid99.mp4',
                    text: 'Every child deserves to express their feelings safely. Let’s make asking for help a strength.',
                  },
                  {
                    title: 'Yoga for Relaxation (Alt)',
                    src: '/images/Heartbeat_ A Mindfulness Exercise to Calm Your Emotions.mp4',
                    text: 'Another version of the 5-minute yoga session for relaxation.',
                  },
                  {
                    title: 'The Power of Positive Thinking)',
                    src: '/images/vid44.mp4',
                    text: 'Another version of the 5-minute yoga session for relaxation.',
                  },
                ].map((video, idx) => (
                  <div className="card" key={idx}>
                    <video controls>
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="card-content">
                      <h2 className="card-title"><b>{video.title}</b></h2>
                      <p className="card-text">{video.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default BlogPage;