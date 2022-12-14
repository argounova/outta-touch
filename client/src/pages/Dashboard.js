import React, { useState } from 'react';
import AuthService from '../utils/auth';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import NavBar from '../components/NavBar';
import './assets/css/dashboard.css';

// get custom hamburger nav icon
import hamburgerIcon from './assets/img/HamburgerIcon.png';
import logOutIcon from './assets/img/LogOut.png';

const Dashboard = () => {

  // TODO: Find a way to toggle this class when dropdown is active to be able to have a background, it is currently set to white, will want to change to an rgba transparent background of the current nav background color
  const toggleClass = 'toggle-container';

  const [showToggleClass, setShowToggleClass] = useState(false);

  // const showEl = document.getElementsByClassName('.show');

  // showEl ? setShowToggleClass(true) : setShowToggleClass(false);

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
                <div className={showToggleClass ? toggleClass : null}>
                  <button className='dashboard-logout' onClick={AuthService.logout}>
                    <img className='custom-nav-icons' src={logOutIcon} />
                  </button>
                </div>
              </Nav>
            </Navbar.Collapse>
          </>
        } />
      </header>
      <main className='dashboard-main'>
        <h2>My Group</h2>
        <h2>Create A Group</h2>
        <h2>Find Group</h2>
      </main>
    </>
  )
};

export default Dashboard;