import React from 'react';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import NotFound from './pages/NotFound';
import { ProjectsPage } from './pages/ProjectsPage';
import { ROUTES } from './config/constants';
import 'bootstrap/dist/css/bootstrap.css';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const App = () => (
  <div>
    <Router history={history}>
      <AuthProvider>
        <Switch>
          <Redirect exact from="/" to={ROUTES.HOME} />
          <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
          <PrivateRoute exact path={ROUTES.HOME} component={ProjectsPage} />
          <PrivateRoute
            exact
            path={ROUTES.UPDATE_PROFILE}
            component={UpdateProfile}
          />
          <Route path={ROUTES.SIGN_UP} component={Signup} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route path="*" component={NotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  </div>
);
