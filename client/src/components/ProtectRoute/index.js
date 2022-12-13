import React from 'react'
import { Link } from 'react-router-dom';

import logo from './assets/images/HomeButtonImage.png';

import './assets/css/protectroute.css';

const ProtectRoute = () => {
  return (
    <main className='protect-main'>
        <Link to='/'>
          <img className='protect-logo' src={logo} />
        </Link>
          <h1 className='error-msg'>Sorry, but you must be logged in to your account to view this information.</h1>
    </main>
  )
};

export default ProtectRoute;
