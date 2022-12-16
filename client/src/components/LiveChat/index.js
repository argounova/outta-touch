import React from "react";
import './assets/css/livechat.css';
// import { useNavigate } from "react-router-dom";
// import Photos from "../Photos";

import { QUERY_GROUP } from '../../utils/queries';
import { ADD_GROUP_MEMBER } from "../../utils/mutations";
import { useQuery, useMutation } from '@apollo/client';

import inviteBtn from './assets/img/Invite.png';

import Auth from "../../utils/auth";

const LiveChat = () => {
    // const navigate = useNavigate();

    const { loading, data } = useQuery(QUERY_GROUP,
        {
            variables: {
                groupId: localStorage.getItem('currentGroupChat')
            }
        });

    // console.log(loading ? 'Loading ...' : data.group.admins);
    let adminArray = loading ? 'Loading ...' : data.group.admins;

    console.log(adminArray);

    const AddGroupMember = () => {
        const [addGroupMember, { error, data }] = useMutation(ADD_GROUP_MEMBER);
        const currentUser = Auth.getUser();
        const currentGroup = localStorage.getItem('currentGroupChat');

        function evaluateClick() {
            for (let i = 0; i < adminArray.length; i++) {
                console.log(adminArray[i]._id);
                console.log(currentUser.data._id);
                if (adminArray[i]._id.includes(currentUser.data._id)) {
                    alert('Sick Dude')
                }
                else {
                    alert('You must be an admin to add a group member')
                }
            }
        }

        // try {
        //     const { data } = addGroupMember({
        //         variables: {
        //             userId: '2331423dwed23',
        //             groupId: 'lajsflkf3k32kd',
        //             admin: 'asdfsdfoe3'
        //         },
        //     });

        // } catch (e) {
        //     console.error(e);
        // }

        return (
            <button className='invite-btn' onClick={evaluateClick}>
                <img className='invite-icon' src={inviteBtn} alt='invite button' />
            </button>
        )

    }

// ! have two handlers? One if admin matches user id and on if not?
    const successMemberClick = () => {
        
    }

    const failureMemberClick = () => {

    }

    return (
        <>
            <div className='chat-name'>
                {/* TODO: Add dynamic chat name */}
                <h2> {loading ? (<div>Loading...</div>) : data.group.name} </h2>
                {/* TODO: Add logo button for photos */}
                {/* <button onClick={ () => navigate(<Photos/>) }>PHOTOS</button> */}
                <AddGroupMember />
            </div>
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

export default LiveChat;