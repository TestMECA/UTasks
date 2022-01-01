import React, { useRef, useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../config/constants.js';
import { addUserToFB } from '../helpers/firestore-api.js';

export default function Signup() {
  const emailRef = useRef();
  const userNameRef = useRef();
  const jobTitleRef = useRef();
  const companyNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const payload = {
      userName: userNameRef.current.value,
      jobTitle: jobTitleRef.current.value,
      companyName: companyNameRef.current.value,
    };
    let userAuthData;
    try {
      setError('');
      setLoading(true);
      userAuthData = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log('User created! - ' + emailRef.current.value);

      history.push(ROUTES.HOME);
    } catch (e) {
      setError('Failed to create an account');
      console.log('User Failed! - ' + e.message);
    }

    // Add the user entry to the Firestore database
    addUserToFB(userAuthData.user.uid, payload)
      .then(() => {
        console.log(
          'User entry added successfully to the Firestore database at user Id:',
          userAuthData.user.uid
        );
      })
      .catch((exp) =>
        console.log('Failed to add user entry to the Firestore database', exp)
      );

    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body data-testid="signup-card">
            <h2 className="text-center mb-4" data-testid="title">
              Sign Up
            </h2>
            {error && (
              <Alert variant="danger" data-testid="error-message">
                {error}
              </Alert>
            )}
            <Form onSubmit={handleSubmit} data-testid="signup-form">
              <Form.Group id="userName" data-testid="userName">
                <Form.Label data-testid="label">User name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Wick"
                  ref={userNameRef}
                  data-testid="input"
                />
              </Form.Group>

              <Form.Group id="jobTitle" data-testid="jobTitle">
                <Form.Label data-testid="label">Job title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ninja Tester"
                  ref={jobTitleRef}
                  data-testid="input"
                />
              </Form.Group>

              <Form.Group id="companyName" data-testid="companyName">
                <Form.Label data-testid="label">Company name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="TestMECA"
                  ref={companyNameRef}
                  data-testid="input"
                />
              </Form.Group>

              <Form.Group id="email" data-testid="email">
                <Form.Label data-testid="label">Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="member@utasks.com"
                  ref={emailRef}
                  required
                  data-testid="input"
                />
              </Form.Group>
              <Form.Group id="password" data-testid="password">
                <Form.Label data-testid="label">Password*</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                  data-testid="input"
                />
              </Form.Group>
              <Form.Group id="password-confirm" data-testid="confirm-password">
                <Form.Label data-testid="label">
                  Password Confirmation*
                </Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                  data-testid="input"
                />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100"
                type="submit"
                style={{ background: '#0080c8', borderColor: '#0080c8' }}
                data-testid="signup-btn"
              >
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2" data-testid="login">
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#0080c8' }}>
            Log In
          </Link>
        </div>
      </div>
    </Container>
  );
}
