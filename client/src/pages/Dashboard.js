import React from 'react';
import AuthService from '../utils/auth';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import NavBar from '../components/NavBar';
import './assets/css/dashboard.css';

// get custom hamburger nav icon
import hamburgerIcon from './assets/img/HamburgerIcon.png';
import logOutIcon from './assets/img/LogOut.png';

const Dashboard = () => {
  return (
    <>
    <header className='dashboard-header'>
      <NavBar navToggle={
        <>
          <Navbar.Toggle className='toggle-button' aria-controls="custom-collapse">
            <img className='toggle-icon' src={hamburgerIcon} />
          </Navbar.Toggle>
          <Navbar.Collapse id="custom-collapse">
            <Nav className="me-auto">
              <Nav.Link href="/">
                <img className='custom-nav-icons' src={logOutIcon} />
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      } />
      </header>
      <main className='dashboard-main'>
        <h1>Dashboard</h1>
        <button onClick={AuthService.logout}>Logout</button>
      </main>
    </>
  )
};

export default Dashboard;