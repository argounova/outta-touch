import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

// import css file
import './assets/css/landing.css';

const Landing = () => {
  return (
    <>
    <header>
    <NavBar slogan='Are You Outta Touch?'/>
    </header>
    <main className='landing-main'>
      <section className='landing-container'>
      <Link className='landing-text' to='/login'>
      Log In
      </Link>
      <Link className='landing-text' to='/signup'>
      SignUp
      </Link>
      </section>
    </main>
    </>
  )
};

export default Landing;
