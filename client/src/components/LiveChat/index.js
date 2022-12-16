import React from "react";
import './assets/css/livechat.css';
// import { useNavigate } from "react-router-dom";
// import Photos from "../Photos";

import { QUERY_GROUP } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const LiveChat = () => {
    // const navigate = useNavigate();

    const { loading, data } = useQuery(QUERY_GROUP,
        {
            variables: {
                groupId: localStorage.getItem('currentGroupChat')
            }
        });

        console.log(loading ? 'Loading ...' : data.group.name);

    return (
        <>
            <div className='chat-name'>
            {/* TODO: Add dynamic chat name */}
                <h2> { loading ? ( <div>Loading...</div> ) : data.group.name } </h2>
            {/* TODO: Add logo button for photos */}
                {/* <button onClick={ () => navigate(<Photos/>) }>PHOTOS</button> */}
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