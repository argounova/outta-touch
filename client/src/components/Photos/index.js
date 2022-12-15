import React from 'react';
import './assets/css/photos.css';
import { useNavigate } from "react-router-dom";
import LiveChat from "../LiveChat";

const Photos = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='chat-name'>
      {/* TODO: Add dynamic chat name */}
          <h2>Chat Name</h2>
      {/* TODO: Add logo button for photos */}
          <button onClick={ () => navigate(<LiveChat/>) }>LIVE CHAT</button>
      </div>
      <div className='message-div'>
      {/* TODO: Render messages in real time via subscriptions */}
      </div>
      {/* TODO: Add button send message functionality */}
      <button className='message-button'>Upload Photo</button>
    </>
  )
}

export default Photos;
