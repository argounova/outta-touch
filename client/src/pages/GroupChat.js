import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../utils/auth';


// components
import NavBar from '../components/NavBar';

// import css file
import './assets/css/groupchat.css';

const GroupChat = () => {

    const logoutClick = () => {

    }

    const dashboardClick = () => {

    }

    const sendMessageClick = () => {

    }

    const MainContent = () => {
        return (
            <>
            
            <button className='message-button'>Send Message</button>
            </>
        )
    }

    const Photos = () => {
        return (
            <>

            </>
        )
    }

    return (
        <>
        <header>
            <NavBar />
        </header>
        <main className='groupchat-main'>
            <section className='groupchat-container'>
                <div>
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