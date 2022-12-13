import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';


// components
import NavBar from '../components/NavBar';
import Photos from '../components/Photos';

// import css file
import './assets/css/groupchat.css';

const GroupChat = () => {

    const setAll = (isFalse) => {
        setShowMainContent(isFalse);
        setShowPhotos(isFalse);
    }

    const [showMainContent, setShowMainContent] = useState(true);
    const [showPhotos, setShowPhotos] = useState(false);

    const logoutClick = () => {

    }

    const dashboardClick = () => {

    }

    const sendMessageClick = () => {

    }

     const photosClick = () => {
        setAll(false);
        setShowPhotos(true);
    }

    const MainContent = () => {
        return (
            <>
            <div className='message-div'>
                {/* TODO: Render messages in real time via subscriptions */}
            </div>
            <button className='message-button'>Send Message</button>
            </>
        )
    }

    return (
        <>
        <header>
            <NavBar dashboardClick={dashboardClick} photosClick={photosClick}/>
        </header>
        <main className='groupchat-main'>
            <section className='groupchat-container'>
                <div className='groupchat-name'>
                    {/* TODO: Add dynamic group name */}
                    <h2>Group Name</h2>
                </div>
                {showMainContent ? <MainContent /> : null}
                {showPhotos ? <Photos /> : null}
            </section>
        </main>
        </>
    )
}

export default GroupChat;