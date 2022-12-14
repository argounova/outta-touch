import React, { useState } from 'react';
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// components
import NavBar from '../components/NavBar';
import Photos from '../components/Photos';

// css
import './assets/css/chat.css';
import './assets/css/dashboard.css';

// custom hamburger nav icon
import hamburgerIcon from './assets/img/HamburgerIcon.png';
import logOutIcon from './assets/img/LogOut.png';

const Chat = () => {

    const navigate = useNavigate();
    const toggleClass = 'toggle-container';
    const [showToggleClass, setShowToggleClass] = useState(false);

    const setAll = (isFalse) => {
        setShowMainContent(isFalse);
        setShowPhotos(isFalse);
    }

    const [showMainContent, setShowMainContent] = useState(true);
    const [showPhotos, setShowPhotos] = useState(false);

    const photosClick = () => {
        setAll(false);
        setShowPhotos(true);
    }

    const homeClick = () => {
        navigate('/dashboard', {replace: true});
    }

    const MainContent = () => {
        return (
            <>
            <div className='message-div'>
                {/* TODO: Render messages in real time via subscriptions */}
            </div>
            {/* TODO: Add button send message functionality */}
            <button className='message-button'>Send Message</button>
            </>
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
        <main className='chat-main'>
            <section className='chat-container'>
                <div className='chat-name'>
                    {/* TODO: Add dynamic chat name */}
                    <h2>Chat Name</h2>
                </div>
                {showMainContent ? <MainContent /> : null}
                {showPhotos ? <Photos /> : null}
            </section>
        </main>
        </>
    )
}

export default Chat;