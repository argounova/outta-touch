import React, { useState } from "react";
import './assets/css/usermessages.css';
import { useQuery, useSubscription } from '@apollo/client';
import { QUERY_GROUP } from '../../utils/queries';
import {MESSAGE_SUBSCRIPTION} from '../../utils/subscriptions'

const DisplayMessages = () => {

    const currentGroup = localStorage.getItem('currentGroupChat');
    const currentUser = localStorage.getItem('currentUser');
    const groupMessageData = JSON.parse(localStorage.getItem('groupMessageData'));

    // console.log(groupMessageData);

    const { loading, data, } = useSubscription(MESSAGE_SUBSCRIPTION);

    // if subscriptions is still loading, present whats in loc storage (data is deleted from loc storage after logout)
    const messageData = loading ? groupMessageData : data.messageAdded.data.messages;
    // console.log(messageData);

    const handleTimeStamp = (index) => {
        let time = messageData[index].timestamp;
        let date = new Date(time);
        date = date.toLocaleString();
        return date;
    }

    const handleMessages = Object.keys(messageData).map((index) => {

            // if messages belong to the logged in user style them this way:
            if (messageData[index].user.username === currentUser) {
                return (
                    <ul className="user-messages" key={index} style={{
                        textAlign: "right",
                        alignSelf: "flex-end",
                        border: "2px solid var(--blue)",
                        backgroundColor: "var(--blue)"

                    }}>
                        <li className="message-username" style={{
                            color: "var(--orange)"
                        }}>{messageData[index].user.username}</li>
                        <li className="message-body" style={{
                            color: "var(--yellow)"
                        }}>{messageData[index].body}</li>
                        <li className="message-timestamp" style={{
                            color: "var(--light-grey)"
                        }}>{handleTimeStamp(index)}</li>
                    </ul>
                )

                // for anyone else, style them this way:
            } else {
                return (
                    <>
                    <ul className="user-messages" key={index} style={{
                        textAlign: "left",
                        alignSelf: "flex-start",
                        border: "2px solid var(--light-grey)",
                        backgroundColor: "var(--light-grey)"

                    }}>
                        <li className="message-username">{messageData[index].user.username}</li>
                        <li className="message-body">{messageData[index].body}</li>
                        <li className="message-timestamp">{handleTimeStamp(index)}</li>
                    </ul>
                    </>
                )
        }

    });

    const MessageDiv = () => {
        
        return (
            <div id="scroll" className='message-div'>
                {/* TODO: Render messages in real time */}
                { handleMessages }
            </div>
        )
    }

    return (
        <>
            <div className="heading-container">
                <h2 id="user-heading">Logged in as: {currentUser}</h2>
            </div>
            <MessageDiv />
        </>
    )
}

export default DisplayMessages;