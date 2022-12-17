import React from "react";
import './assets/css/usermessages.css'

const UserMessages = () => {

    return (
        <>
        <div className='message-div'>
                {/* TODO: Render messages in real time via subscriptions */}
            </div>
            {/* TODO: Add button send message functionality */}
            <form className="message-form">
                <input className="message-input" placeholder=". . . my super sick message" name="chat" type="text" />
                <button className='message-button' type="submit" >Send Message</button>
            </form>
            </>
    )
}

export default UserMessages;