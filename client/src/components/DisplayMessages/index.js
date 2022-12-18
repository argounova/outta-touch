import React, { useState } from "react";
import './assets/css/usermessages.css';
import { useQuery } from '@apollo/client';
import { QUERY_GROUP } from '../../utils/queries';


const DisplayMessages = () => {

    const currentGroup = localStorage.getItem('currentGroupChat');
    const currentUser = localStorage.getItem('currentUser');

    const { loading, data } = useQuery(QUERY_GROUP,
        {
            variables: {
                groupId: currentGroup
            }
        })

    const messageData = loading ? 'Loading...' : data.group.messages;
    console.log(messageData);

    const handleMessages = Object.keys(messageData).map((index) => {

        if (loading) {
            return (
                <div>Loading...</div>
            )
        } else {
            return(
                <ul className="user-messages" key={index}>
                <li className="message-username">{messageData[index].user.username}</li>
                <li className="message-body">{messageData[index].body}</li>
                <li className="message-timestamp">sent: {messageData[index].timestamp}</li>
                </ul>
            )
        }

    });

    return (
        <>
            <div className='message-div'>
                {/* TODO: Render messages in real time */}
                <h2 id="user-heading">Logged in as: {currentUser}</h2>
                    {loading ? 'Loading..' : handleMessages}
            </div>
        </>
    )
}

export default DisplayMessages;