import React, { useState } from 'react';
import AuthService from '../utils/auth';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// components
import NavBar from '../components/NavBar';
import MyGroups from '../components/MyGroups';
import CreateAGroup from '../components/CreateAGroup';
import FindAGroup from '../components/FindAGroup';

// css
import './assets/css/dashboard.css';

// get custom hamburger nav icon
import hamburgerIcon from './assets/img/HamburgerIcon.png';
import logOutIcon from './assets/img/LogOut.png';
import createAGroupIcon from './assets/img/CreateAGroup.png';
import findAGroupIcon from './assets/img/FindAGroup.png';
import myGroupsIcon from './assets/img/MyGroups.png';

const Dashboard = () => {
  // TODO: Additional styling needed for this page

  // TODO: Find a way to toggle this class when dropdown is active to be able to have a background, it is currently set to white, will want to change to an rgba transparent background of the current nav background color
  const toggleClass = 'toggle-container';

  const [showToggleClass, setShowToggleClass] = useState(false);

  // const showEl = document.getElementsByClassName('.show');

  // showEl ? setShowToggleClass(true) : setShowToggleClass(false);

  // * useState to render diff components

  const [showMainContent, setShowMainContent] = useState(true);
  const [showMyGroups, setShowMyGroups] = useState(false);
  const [showCreateAGroup, setShowCreateAGroup] = useState(false);
  const [showFindAGroup, setShowFindAGroup] = useState(false);

  // set all to false when rendering diff components
  const setAll = (isFalse) => {
    setShowMainContent(isFalse);
    setShowMyGroups(isFalse);
    setShowCreateAGroup(isFalse);
    setShowFindAGroup(isFalse);
  }

  // click handlers
  const myGroupsClick = () => {
    setAll(false);
    setShowMyGroups(true);
  }

  const createAGroupClick = () => {
    setAll(false);
    setShowCreateAGroup(true);
  }

  const findAGroupClick = () => {
    setAll(false);
    setShowFindAGroup(true);
  }

  const homeClick = () => {
    setAll(false);
    setShowMainContent(true);
  }

  const MainContent = () => {
    return (
      <section className='mainContent-section'>
        <button id='paintSplatter1' className='dashboard-buttons' onClick={myGroupsClick}>
          <img className='customDash-icon' src={myGroupsIcon} />
        </button>
        <button id='paintSplatter2' className='dashboard-buttons' onClick={createAGroupClick}>
          <img className='customDash-icon' src={createAGroupIcon} />
        </button>
        <button id='paintSplatter3' className='dashboard-buttons' onClick={findAGroupClick}>
          <img className='customDash-icon' src={findAGroupIcon} />
        </button>
      </section>
    )
  }

  return (
    <>
      <header className='dashboard-header'>
        <NavBar homeclick={homeClick} navToggle={
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
        {showMainContent ? <MainContent /> : null}
        {showCreateAGroup ? <CreateAGroup /> : null}
        {showMyGroups ? <MyGroups /> : null}
        {showFindAGroup ? <FindAGroup /> : null}
      </main>
    </>
  )
};

export default Dashboard;