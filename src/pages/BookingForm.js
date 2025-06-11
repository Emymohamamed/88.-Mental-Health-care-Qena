import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/BookingForm.css';

function BookingForm() {
  const [formData, setFormData] = useState({
    patientName: '',
    patientNumber: '',
    patientEmail: '',
    patientDocument: null,
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: '',
    bankName: '',
    accountNumber: '',
    swiftCode: '',
  });

  const [errors, setErrors] = useState({});
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  useEffect(() => {
    setShowPaymentMethod(formData.appointmentType === 'online');
    setShowCreditCard(formData.paymentMethod === 'credit_card');
    setShowPayPal(formData.paymentMethod === 'paypal');
    setShowBankTransfer(formData.paymentMethod === 'bank_transfer');
  }, [formData.appointmentType, formData.paymentMethod]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName) newErrors.patientName = 'Patient name is required.';
    if (!formData.patientNumber) newErrors.patientNumber = 'Patient number is required.';
    if (!formData.patientEmail) newErrors.patientEmail = 'Email is required.';
    if (!formData.patientDocument) newErrors.patientDocument = 'Document is required.';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Appointment date is required.';
    if (!formData.appointmentTime) newErrors.appointmentTime = 'Appointment time is required.';
    if (!formData.appointmentType) newErrors.appointmentType = 'Appointment type is required.';
    if (formData.appointmentType === 'online' && !formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required for online appointments.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const message = `Appointment booked successfully!\nPatient Name: ${formData.patientName}\nPatient Number: ${formData.patientNumber}\nEmail: ${formData.patientEmail}\nDate: ${formData.appointmentDate}\nTime: ${formData.appointmentTime}\nType: ${formData.appointmentType}\nPayment Method: ${formData.paymentMethod || 'N/A'}`;
      setConfirmationMessage(message);
      setFormData({
        patientName: '',
        patientNumber: '',
        patientEmail: '',
        patientDocument: null,
        appointmentDate: '',
        appointmentTime: '',
        appointmentType: '',
        paymentMethod: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        paypalEmail: '',
        bankName: '',
        accountNumber: '',
        swiftCode: '',
      });
      setShowPaymentMethod(false);
      setShowCreditCard(false);
      setShowPayPal(false);
      setShowBankTransfer(false);
    }
  };

  const doctorInfo = {
    name: 'Dr. Huda Saad',
    specialty: 'Family therapy',
    education: 'MBBS, MD in Family Medicine',
    contact: '0123456789',
    address: 'Nov. 4, Aswan',
    availableDays: 'Sunday - Thursday',
    workingHours: '9 AM - 5 PM',
    image: '/images/doc/f.webp',
  };

  return (
    <div className="booking-form-page">
      <Navbar />
      <div className="header-image text-center mb-4">
        <img src="/images/doc/bbt.gif" alt="Booking Header" className="header-img" />
      </div>
      <Container>
        <Row>
          <Col md={6}>
            <Card className="doctor-card">
              <Card.Header className="text-center">
                <h5>Doctor Information</h5>
              </Card.Header>
              <Card.Body className="text-center">
                <img src={doctorInfo.image} alt="Doctor" className="doctor-image" />
                <p>
                  <i className="fas fa-user-md"></i> <strong>Name:</strong> {doctorInfo.name}
                </p>
                <hr />
                <p>
                  <i className="fas fa-stethoscope"></i> <strong>Specialty:</strong> {doctorInfo.specialty}
                </p>
                <p>
                  <i className="fas fa-graduation-cap"></i> <strong>Education:</strong> {doctorInfo.education}
                </p>
                <hr />
                <p>
                  <i className="fas fa-phone"></i> <strong>Contact:</strong> {doctorInfo.contact}
                </p>
                <p>
                  <i className="fas fa-map-marker-alt"></i> <strong>Address:</strong> {doctorInfo.address}
                </p>
                <hr />
                <p>
                  <i className="fas fa-clock"></i> <strong>Available Days:</strong> {doctorInfo.availableDays}
                </p>
                <p>
                  <i className="fas fa-calendar-alt"></i> <strong>Working Hours:</strong> {doctorInfo.workingHours}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="appointment-card">
              <Card.Header>
                <h5>Appointment Booking</h5>
              </Card.Header>
              <Card.Body>
                <Form id="appointmentForm">
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      required
                    />
                    {errors.patientName && <div className="error">{errors.patientName}</div>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Number:</Form.Label>
                    <Form.Control
                      type="text"
                      name="patientNumber"
                      value={formData.patientNumber}
                      onChange={handleChange}
                      required
                    />
                    {errors.patientNumber && <div className="error">{errors.patientNumber}</div>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="patientEmail"
                      value={formData.patientEmail}
                      onChange={handleChange}
                      required
                    />
                    {errors.patientEmail && <div className="error">{errors.patientEmail}</div>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Birth Certificate or ID:</Form.Label>
                    <Form.Control
                      type="file"
                      name="patientDocument"
                      onChange={handleChange}
                      accept="image/*,.pdf"
                      required
                    />
                    {errors.patientDocument && <div className="error">{errors.patientDocument}</div>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Appointment Date:</Form.Label>
                    <Form.Control
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      required
                    />
                    {errors.appointmentDate && <div className="error">{errors.appointmentDate}</div>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Appointment Time:</Form.Label>
                    <div className="btn-group btn-group-toggle d-flex flex-wrap">
                      {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'].map((time) => (
                        <Form.Check
                          key={time}
                          type="radio"
                          label={time}
                          name="appointmentTime"
                          value={time}
                          checked={formData.appointmentTime === time}
                          onChange={handleChange}
                          className="booking-form-time-button mx-1"
                          required
                        />
                      ))}
                    </div>
                    {errors.appointmentTime && <div className="error">{errors.appointmentTime}</div>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Appointment Type:</Form.Label>
                    <Form.Select
                      name="appointmentType"
                      value={formData.appointmentType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="online">Online</option>
                      <option value="in_clinic">In Clinic</option>
                    </Form.Select>
                    {errors.appointmentType && <div className="error">{errors.appointmentType}</div>}
                  </Form.Group>
                  {showPaymentMethod && (
                    <Form.Group className="mb-3">
                      <Form.Label>Payment Method:</Form.Label>
                      <Form.Select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                      >
                        <option value="">Select Payment Method</option>
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank_transfer">Bank Transfer</option>
                      </Form.Select>
                      {errors.paymentMethod && <div className="error">{errors.paymentMethod}</div>}
                    </Form.Group>
                  )}
                  {showCreditCard && (
                    <div>
                      <Form.Group className="mb-3">
                        <Form.Label>Card Number:</Form.Label>
                        <Form.Control
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          maxLength="16"
                          placeholder="1234 5678 9012 3456"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Expiry Date:</Form.Label>
                        <Form.Control
                          type="month"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>CVV:</Form.Label>
                        <Form.Control
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          maxLength="3"
                          placeholder="123"
                        />
                      </Form.Group>
                    </div>
                  )}
                  {showPayPal && (
                    <Form.Group className="mb-3">
                      <Form.Label>PayPal Email:</Form.Label>
                      <Form.Control
                        type="email"
                        name="paypalEmail"
                        value={formData.paypalEmail}
                        onChange={handleChange}
                        placeholder="example@paypal.com"
                      />
                    </Form.Group>
                  )}
                  {showBankTransfer && (
                    <div>
                      <Form.Group className="mb-3">
                        <Form.Label>Bank Name:</Form.Label>
                        <Form.Control
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleChange}
                          placeholder="Bank Name"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Account Number:</Form.Label>
                        <Form.Control
                          type="text"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleChange}
                          placeholder="1234567890"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>SWIFT Code:</Form.Label>
                        <Form.Control
                          type="text"
                          name="swiftCode"
                          value={formData.swiftCode}
                          onChange={handleChange}
                          placeholder="ABCDEFGH"
                        />
                      </Form.Group>
                    </div>
                  )}
                  <button className="booking-form-book-button" onClick={handleSubmit}>
                    Book Appointment
                  </button>
                </Form>
                {confirmationMessage && (
                  <Alert variant="success" className="mt-3">
                    {confirmationMessage}
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default BookingForm;