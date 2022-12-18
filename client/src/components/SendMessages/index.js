import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { POST_MESSAGE } from "../../utils/mutations";

import './assets/css/sendmessages.css';

const SendMessages = () => {
    const currentGroup = localStorage.getItem('currentGroupChat');
    const currentUser = localStorage.getItem('currentUser');
    const [formState, setFormState] = useState({ message: '' });
    const [postMessage, { error, data }] = useMutation(POST_MESSAGE);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });

        console.log(formState.message);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await postMessage({
                variables: {
                    body: formState.message,
                    username: currentUser,
                    groupId: currentGroup,
                }
            })
        }
        catch (error) {
            console.log(error);
        }

        setFormState({
            message: ''
        });

        document.querySelector('#message').value = '';
    };

    return (
        // {/* TODO: Add button send message functionality */}

        <form className="message-form" onSubmit={handleFormSubmit}>
            <input id="message" className="message-input" placeholder=". . . my super sick message" name="message" type="text" onChange={handleChange} />
            <button id="send" className='message-button' type="submit" >Send Message</button>
        </form>

    )
}

export default SendMessages;