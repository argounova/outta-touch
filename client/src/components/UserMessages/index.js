import React, { useState } from "react";
import './assets/css/usermessages.css';
import { useQuery } from '@apollo/client';
import { QUERY_GROUP } from '../../utils/queries';


const UserMessages = () => {

    const currentGroup = localStorage.getItem('currentGroupChat');
    const currentUser = localStorage.getItem('currentUser');
    const [formState, setFormState] = useState({ message: '' });

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



    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });

        console.log(formState);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setFormState({
            message: ''
        });
    };



    return (
        <>
            <div className='message-div'>
                {/* TODO: Render messages in real time via subscriptions */}
                <h2 id="user-heading">Logged in as: {currentUser}</h2>
                    {loading ? 'Loading..' : handleMessages}
            </div>
            {/* TODO: Add button send message functionality */}
            <form className="message-form" onSubmit={handleFormSubmit}>
                <input id="message" className="message-input" placeholder=". . . my super sick message" name="message" type="text" onChange={handleChange} />
                <button id="send" className='message-button' type="submit" >Send Message</button>
            </form>
        </>
    )
}

export default UserMessages;