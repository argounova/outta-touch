import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

import './assets/css/photos.css';

const Photos = () => {

  return (
    <>
    <div className='photo-div'>
        {/* TODO: Render photos in a grid as smaller images that once clicked expand to full screen */}
    </div>
    <button className='return-button'>Return to Chat</button>
    </>
  )
}

export default Photos;
