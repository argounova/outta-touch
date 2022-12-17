import React, { useState } from "react";
import './assets/css/usermessages.css'

const UserMessages = () => {
    
    const currentGroup = localStorage.getItem('currentGroupChat');
    const currentUser = localStorage.getItem('currentUser');
    const [formState, setFormState] = useState({ message: ''});

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

        setFormState({
            message: ''
        });
    };



    return (
        <>
            <div className='message-div'>
                {/* TODO: Render messages in real time via subscriptions */}
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