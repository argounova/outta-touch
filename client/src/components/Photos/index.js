import React from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/css/photos.css';

const Photos = () => {

  const navigate = useNavigate();

  const returnClick = () => {
    navigate('/chat', {replace: true});
    setShowMainContent(true);
  }

  return (
    <>
    <div className='photo-div'>
{/* TODO: Render photos in a grid as smaller images that once clicked expand to full screen */}
    </div>
    <button className='return-button' onClick={returnClick}>Return to Chat</button>
    </>
  )
}

export default Photos;
