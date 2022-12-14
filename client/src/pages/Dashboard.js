import React from 'react';
import AuthService from '../utils/auth';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import NavBar from '../components/NavBar';

const Dashboard = () => {
  return (
    <>
      <NavBar navToggle={
        <>
          <Navbar.Toggle aria-controls="custom-collapse" />
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