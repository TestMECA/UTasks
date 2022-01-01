import React, { useState } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

import { ROUTES } from '../config/constants.js';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body data-testid="profile">
            <h2 className="text-center mb-4" data-testid="title">
              Profile
            </h2>
            {error && (
              <Alert data-testid="error-message" variant="danger">
                {error}
              </Alert>
            )}
            <strong data-testid="username">Email:</strong>{' '}
            {currentUser?.userData?.email}
            <Link
              to={ROUTES.HOME}
              className="btn btn-primary w-100 mt-3"
              data-testid="go-home"
            >
              Go Home
            </Link>
            <Link
              to={ROUTES.UPDATE_PROFILE}
              className="btn btn-primary w-100 mt-3"
              data-testid="update-profile"
            >
              Update Profile
            </Link>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2" data-testid="logout">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </Container>
  );
}
