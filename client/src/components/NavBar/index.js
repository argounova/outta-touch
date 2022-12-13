import React from 'react';
import { Link } from 'react-router-dom';

// bootstrap components
import Navbar from 'react-bootstrap/Navbar';

// import home btn image
import logo from './assets/img/HomeButtonImage.png';

// import independent styling
import './assets/css/navbar.css'

const NavBar = (props) => {
    return (
        <Navbar className='custom-navbar' expand="lg">
          <button className='home-button' onClick={props.homeclick}>
            <img className='nav-logo' src={logo}/>
          </button>
          <h1 className='slogan'>{props.slogan}</h1>
          {props.navToggle}
      </Navbar>
    )
  };
  
  export default NavBar;

//   TODO: Show this on Dashboard page (needs styling) - use props.navToggle and ditch props.slogan

// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

//  <Navbar.Toggle aria-controls="basic-navbar-nav" />
// <Navbar.Collapse id="basic-navbar-nav">
// <Nav className="me-auto">
//   <Nav.Link href="/">Sign Out</Nav.Link>
// </Nav>
// </Navbar.Collapse>

// TODO: Show this on Group Chat page (needs styling) - use props.navToggle and ditch props.slogan

// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

{/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="me-auto">
    <Nav.Link href="/">Sign Out</Nav.Link>
    <Nav.Link href="/chat/photos">Group Photos</Nav.Link>
  </Nav>
</Navbar.Collapse> */}