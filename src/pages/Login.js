import React, { useRef, useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/constants.js';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.userData) navigate(ROUTES.HOME, { replace: true });
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    setLoading(true);

    login(emailRef.current.value, passwordRef.current.value).catch((error) => {
      setError('Failed to log in');
      console.log('Failed to log in - ' + e.message);
    });

    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body data-testid="login-card">
            <h2 className="text-center mb-4" data-testid="title">
              Log In
            </h2>
            {error && (
              <Alert data-testid="error-message" variant="danger">
                {error}
              </Alert>
            )}
            <Form onSubmit={handleSubmit} data-testid="login-form">
              <Form.Group id="email" data-testid="email">
                <Form.Label data-testid="label">Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  data-testid="input"
                />
              </Form.Group>
              <Form.Group id="password" data-testid="password">
                <Form.Label data-testid="label">Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                  data-testid="input"
                />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100"
                type="submit"
                style={{ background: '#0080c8', borderColor: '#0080c8' }}
                data-testid="loginbtn"
              >
                Log In
              </Button>
            </Form>
            <div
              className="w-100 text-center mt-3"
              data-testid="forgot-password"
            >
              <Link to={ROUTES.FORGOT_PASSWORD} style={{ color: '#0080c8' }}>
                Forgot Password?
              </Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2" data-testid="signup">
          Need an account?{' '}
          <Link to={ROUTES.SIGN_UP} style={{ color: '#0080c8' }}>
            Sign Up
          </Link>
        </div>
      </div>
    </Container>
  );
}
