import React from 'react';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import NotFound from './pages/NotFound';
import { ProjectsPage } from './pages/ProjectsPage';
import { ROUTES } from './config/constants';
import 'bootstrap/dist/css/bootstrap.css';

export const App = () => (
  <div>
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <PrivateRoute>
                {' '}
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.HOME}
            element={
              <PrivateRoute>
                {' '}
                <ProjectsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.UPDATE_PROFILE}
            element={
              <PrivateRoute>
                {' '}
                <UpdateProfile />
              </PrivateRoute>
            }
          />

          <Route path={ROUTES.SIGN_UP} element={<Signup />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  </div>
);
