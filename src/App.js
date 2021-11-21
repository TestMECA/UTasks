import React from "react"
import Signup from "./pages/Signup"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import PrivateRoute from "./pages/PrivateRoute"
import ForgotPassword from "./pages/ForgotPassword"
import UpdateProfile from "./pages/UpdateProfile"
import { ProjectsPage } from "./pages/ProjectsPage"
import 'bootstrap/dist/css/bootstrap.css';

export const App = () => (
  <div>
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/home" component={ProjectsPage} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  </div>

);


