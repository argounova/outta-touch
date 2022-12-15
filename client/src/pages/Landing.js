import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// components
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Signup from '../components/SignUp';

// import css file
import './assets/css/landing.css';

const Landing = () => {
    // function to set the state of all components to false in order to show only the content we want to
  const setAll = (isFalse) => {
    setShowMainContent(isFalse);
    setShowLogin(isFalse);
    setShowSignup(isFalse);
  }

  const [showMainContent, setShowMainContent] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const loginClick = () => {
    setAll(false);
    setShowLogin(true);
  }

  const signupClick = () => {
    setAll(false);
    setShowSignup(true);
  }

  const homeClick = () => {
    setAll(false);
    setShowMainContent(true);
  }

  const MainContent = () => {
    return (
      <>
      <button className='landing-button' onClick={loginClick}>
      Log In
      </button>
      <button className='landing-button' onClick={signupClick}>
      SignUp
      </button>
      </>
    )
}

  return (
    <>
    <header>
    <NavBar slogan='Are You Outta Touch?' homeclick={homeClick}/>
    </header>
    <main className='landing-main'>
      <section className='landing-container'>
        {showMainContent ? <MainContent /> : null}
        {showLogin ? <Login /> : null}
        {showSignup ? <Signup /> : null}
      </section>
    </main>
    </>
  )
};

export default Landing;
