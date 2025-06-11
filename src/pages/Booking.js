import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Booking.css';
import { Link } from 'react-router-dom';

function Booking() {
  const [cityFilters, setCityFilters] = useState([]);
  const [genderFilter, setGenderFilter] = useState('all');
  const [ratingFilters, setRatingFilters] = useState([]);
  const [specialtyFilters, setSpecialtyFilters] = useState([]);

  const therapists = [
    {
      id: 1,
      name: 'Dr. Huda Saad',
      specialty: 'Family therapy',
      city: 'Aswan',
      gender: 'female',
      rating: 'rating4',
      price: '1300 EGP/60 Min | 900 EGP/30 Min',
      appointment: 'Nov. 4, Aswan',
      image: '/images/doc/f.webp',
    },
    {
      id: 2,
      name: 'Dr. Khalid Jone',
      specialty: 'Therapist',
      city: 'Luxor',
      gender: 'male',
      rating: 'rating3',
      price: '1000 EGP/60 Min | 500 EGP/30 Min',
      appointment: 'Nov. 14, Luxor',
      image: '/images/doc/d.jpeg',
    },
    {
      id: 3,
      name: 'Dr. Marwa Fadl',
      specialty: 'Clinical Psychology',
      city: 'Minya',
      gender: 'female',
      rating: 'rating3',
      price: '1100 EGP/60 Min | 550 EGP/30 Min',
      appointment: 'Sep. 1, Minya',
      image: '/images/doc/mm.png',
    },
    {
      id: 4,
      name: 'Dr. Ali Ahmed',
      specialty: 'Consulting Psychology',
      city: 'Qena',
      gender: 'male',
      rating: 'rating3',
      price: '1600 EGP/60 Min | 800 EGP/30 Min',
      appointment: 'Nov. 8, Qena',
      image: '/images/doc/b.webp',
    },
    {
      id: 5,
      name: 'Dr. Hadi Ali',
      specialty: 'Depression, Addiction',
      city: 'Assiut',
      gender: 'male',
      rating: 'rating5',
      price: '1900 EGP/60 Min | 950 EGP/30 Min',
      appointment: 'Nov. 1, Assiut',
      image: '/images/doc/r.webp',
    },
    {
      id: 6,
      name: 'Dr. Sara Khalid',
      specialty: 'Therapist',
      city: 'Luxor',
      gender: 'female',
      rating: 'rating2',
      price: '1000 EGP/60 Min | 500 EGP/30 Min',
      appointment: 'Nov. 14, Luxor',
      image: '/images/doc/a.webp',
    },
    {
      id: 7,
      name: 'Dr. Nour Fadel',
      specialty: 'Counseling Psychology',
      city: 'Luxor',
      gender: 'male',
      rating: 'rating3',
      price: '1000 EGP/60 Min | 500 EGP/30 Min',
      appointment: 'Nov. 14, Luxor',
      image: '/images/doc/t.webp',
    },
    {
      id: 8,
      name: 'Dr. Bassel Tom',
      specialty: 'Clinical Psychology',
      city: 'Assiut',
      gender: 'male',
      rating: 'rating4',
      price: '1200 EGP/60 Min | 600 EGP/30 Min',
      appointment: 'Nov. 20, Assiut',
      image: '/images/doc/pp.webp',
    },
    {
      id: 9,
      name: 'Dr. Mona Jad',
      specialty: 'Neuropsychiatry',
      city: 'Qena',
      gender: 'female',
      rating: 'rating3',
      price: '1100 EGP/60 Min | 500 EGP/30 Min',
      appointment: 'Nov. 10, Qena',
      image: '/images/doc/c.webp',
    },
  ];

  const handleCityFilter = (city) => {
    setCityFilters((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const handleGenderFilter = (gender) => {
    setGenderFilter(gender);
  };

  const handleRatingFilter = (rating) => {
    setRatingFilters((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const handleSpecialtyFilter = (specialty) => {
    setSpecialtyFilters((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const clearFilters = () => {
    setCityFilters([]);
    setGenderFilter('all');
    setRatingFilters([]);
    setSpecialtyFilters([]);
  };

  const filteredTherapists = therapists.filter((therapist) => {
    const cityMatch = cityFilters.length === 0 || cityFilters.includes(therapist.city);
    const genderMatch = genderFilter === 'all' || therapist.gender === genderFilter;
    const ratingMatch =
      ratingFilters.length === 0 || ratingFilters.includes(therapist.rating);
    const specialtyMatch =
      specialtyFilters.length === 0 || specialtyFilters.includes(therapist.specialty);
    return cityMatch && genderMatch && ratingMatch && specialtyMatch;
  });

  return (
    <div className="booking-page">
      <Navbar />
      <section className="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <img src="/images/pd.png" alt="Hero Image" className="background-image" />
      </section>
      <Container className="my-4">
        <Row>
          <Col md={3}>
            <Card className="p-3">
              <h4 className="text-primary">Filters</h4>
              <h6 className="mt-4">City</h6>
              {['Aswan', 'Luxor', 'Qena', 'Minya', 'Assiut'].map((city) => (
                <div className="form-check" key={city}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`city${city}`}
                    checked={cityFilters.includes(city)}
                    onChange={() => handleCityFilter(city)}
                  />
                  <label className="form-check-label" htmlFor={`city${city}`}>
                    {city}
                  </label>
                </div>
              ))}
              <h6 className="mt-4">Therapist Gender</h6>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="allGender"
                  value="all"
                  checked={genderFilter === 'all'}
                  onChange={() => handleGenderFilter('all')}
                />
                <label className="form-check-label" htmlFor="allGender">
                  All
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked={genderFilter === 'male'}
                  onChange={() => handleGenderFilter('male')}
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  checked={genderFilter === 'female'}
                  onChange={() => handleGenderFilter('female')}
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              <h6 className="mt-4">Therapist Rating</h6>
              {[1, 2, 3, 4, 5].map((rating) => (
                <div className="form-check" key={`rating${rating}`}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rating"
                    id={`rating${rating}`}
                    value={`rating${rating}`}
                    checked={ratingFilters.includes(`rating${rating}`)}
                    onChange={() => handleRatingFilter(`rating${rating}`)}
                  />
                  <label className="form-check-label" htmlFor={`rating${rating}`}>
                    {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
                  </label>
                </div>
              ))}
              <h6 className="mt-4">Therapist Specialties</h6>
              {[
                'Family therapy',
                'Therapist',
                'Clinical Psychology',
                'Consulting Psychology',
                'Depression, Addiction',
                'Counseling Psychology',
                'Neuropsychiatry',
              ].map((specialty) => (
                <div className="form-check" key={specialty}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={specialty.replace(/[\s,]/g, '')}
                    checked={specialtyFilters.includes(specialty)}
                    onChange={() => handleSpecialtyFilter(specialty)}
                  />
                  <label className="form-check-label" htmlFor={specialty.replace(/[\s,]/g, '')}>
                    {specialty}
                  </label>
                </div>
              ))}
              <button className="booking-clear-button mt-3" onClick={clearFilters}>
                Clear
              </button>
            </Card>
          </Col>
          <Col md={9} id="therapistCards">
            <Row className="g-3">
              {filteredTherapists.map((therapist) => (
                <Col md={4} key={therapist.id}>
                  <Card className="therapist-card p-3">
                    <Link to={'room'}>
                      <div className="d-flex align-items-center mb-2">
                        <img
                          src={therapist.image}
                          alt="Profile"
                          className="me-3"
                          width="80"
                          height="75"
                        />
                        <div>
                          <h5>{therapist.name}</h5>
                          <p className="text-primary mb-1">Psychiatrist</p>
                          <div className="star-rating">
                            <span>
                              {'★'.repeat(parseInt(therapist.rating.replace('rating', ''))) +
                                '☆'.repeat(5 - parseInt(therapist.rating.replace('rating', '')))}
                            </span>
                          </div>
                        </div>
                      </div></Link>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-cash me-2" style={{ fontSize: '30px' }}></i>
                      <span>{therapist.price}</span>
                    </div>
                    <span className="badge bg-light text-primary">{therapist.specialty}</span>
                    <p className="text-muted">Nearest appointment: {therapist.appointment}</p>
                    <Link to="/booking-form" className="booking-book-button">
                      Book Now
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Booking;