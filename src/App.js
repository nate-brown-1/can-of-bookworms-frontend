import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <h1>New</h1>
        {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
        <Profile></Profile>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks 
                />}
            >
            </Route>
            <Route
              exact path="/about"
              element={<About />}>
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
