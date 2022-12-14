import React from 'react';
import AuthService from '../utils/auth';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import NavBar from '../components/NavBar';
import './assets/css/dashboard.css';

const Dashboard = () => {
  return (
    <>
      <NavBar navToggle={
        <>
          <Navbar.Toggle className='toggle-button' aria-controls="custom-collapse">
            X
            </Navbar.Toggle>
          <Navbar.Collapse id="custom-collapse">
            <Nav className="me-auto">
              <Nav.Link href="/">Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      } />
      <main>
        <h1>Dashboard</h1>
        <button onClick={AuthService.logout}>Logout</button>
      </main>
    </>
  )
};

export default Dashboard;