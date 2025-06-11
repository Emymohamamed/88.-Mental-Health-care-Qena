import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginSignup.css';

const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [accountType, setAccountType] = useState('user'); // Default to 'user'
  const navigate = useNavigate();

  // Function to handle account type change
  const handleAccountTypeChange = (type) => {
    setAccountType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    // accountType: accountType, // Include accountType in the request

    try {
      const response = await fetch('http://mentalhealth.runasp.net/api/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Log the raw response text to debug the issue
        const text = await response.text();
        console.error('Raw response:', text);
        const errorData = await response.json().catch(() => ({ message: 'Invalid response from server.' }));
        throw new Error(errorData.message || 'Login failed. Please check your credentials.');
      }

      const result = await response.json();
      setSuccess('Login successful!');
      localStorage.setItem('token', result.token); // Store token
      localStorage.setItem('UserData', JSON.stringify(result)); // Store user data
      console.log("result", result);

      // Redirect based on role
      const role = result.roles[0]?.toLowerCase(); // Adjust based on actual response structure
      localStorage.setItem('userRole', role); // Store user role
      switch (role) {
        case 'admin':
          navigate('/Admin');
          break;
        case 'doctor':
        case 'therapist':
          navigate('/doctor-profile');
          break;
        case 'visitor':
          navigate('/posts');
          break;
        default:
          setError('Unknown role. Please contact support.');
          break;
      }

      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-row align-items-center">
          <div className="login-col-md-6">
            <div className="login-container">
              <h3>Welcome Back</h3>
              <p>Sign in to your account</p>

              {/* Account Type Selection */}
              <div className="suppage-mb-4 suppage-account-type-section">
                <h5>Select Account Type</h5>
                <div className="suppage-account-type-btn-group" role="group" aria-label="User type selection">
                  <button
                    type="button"
                    className={`suppage-account-type-btn ${accountType === 'user' ? 'suppage-active' : ''}`}
                    id="suppage-userBtn"
                    onClick={() => handleAccountTypeChange('user')}
                  >
                    USER
                  </button>
                  <span className="suppage-account-type-separators"></span>
                  <button
                    type="button"
                    className={`suppage-account-type-btn ${accountType === 'admin' ? 'suppage-active' : ''}`}
                    id="suppage-doctorBtn"
                    onClick={() => handleAccountTypeChange('admin')} // Changed from 'admin' to 'doctor'
                  >
                    ADMIN
                  </button>
                </div>
              </div>
              <span style={{ height: '25px' }}></span>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="login-form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-form-control"
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check
                    type="checkbox"
                    id="rememberMe"
                    label="Remember Me"
                    className="login-form-check"
                  />
                  <Link to="/forgot-password" className="login-forgot-password">
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" className="login-btn-primary w-100">
                  Sign In
                </Button>
              </Form>

              <p className="login-signup-link mt-3">
                Don’t have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
          <div className="login-col-md-6 d-flex justify-content-center align-items-center">
            <img
              src="/images/sinimg.png"
              alt="Login Illustration"
              className="login-image img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;