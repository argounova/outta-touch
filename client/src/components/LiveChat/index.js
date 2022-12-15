import React from "react";
import './assets/css/livechat.css';
import { useNavigate } from "react-router-dom";
import Photos from "../Photos";

const LiveChat = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='chat-name'>
            {/* TODO: Add dynamic chat name */}
                <h2>Chat Name</h2>
            {/* TODO: Add logo button for photos */}
                <button onClick={ () => navigate(<Photos/>) }>PHOTOS</button>
            </div>
            <div className='message-div'>
            {/* TODO: Render messages in real time via subscriptions */}
            </div>
            {/* TODO: Add button send message functionality */}
            <button className='message-button'>Send Message</button>
        </>
    )
}

export default LiveChat;