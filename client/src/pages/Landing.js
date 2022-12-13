import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Landing = () => {
  return (
    <main>
      <NavBar />
      <Link to='/signup' style={{ textDecoration: 'none' }}>
        <h1>Sign Up</h1>
      </Link>
      <Link to='/login' style={{ textDecoration: 'none' }}>
        <h1>Log in</h1>
      </Link>
    </main>
  )
};

export default Landing;
