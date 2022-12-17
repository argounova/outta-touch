import React, { useState } from "react";
import './assets/css/livechat.css';
// import { useNavigate } from "react-router-dom";
// import Photos from "../Photos";

import { QUERY_GROUP, QUERY_USER_BY_NAME } from '../../utils/queries';
import { ADD_GROUP_MEMBER } from "../../utils/mutations";
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

import Swal from 'sweetalert2';

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
    const currentUser = Auth.getUser();

    // console.log(adminArray);

    // *evaluate whether to show the invite/add button
    const evaluateAdmin = () => {
        if (loading) {
            return('Loading...')
        }
        else {
            for (let i = 0; i < adminArray.length; i++) {
                // console.log(adminArray[i]._id);
                // console.log(currentUser.data._id);
                if (adminArray[i]._id.includes(currentUser.data._id)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }

    const AddGroupMember = () => {
        const [addGroupMember] = useMutation(ADD_GROUP_MEMBER);
        const currentGroup = localStorage.getItem('currentGroupChat');
        const [userByName, { loading, data }] = useLazyQuery(QUERY_USER_BY_NAME);
        const [state, setState] = useState(false);

        function handleClick() {
            const userName = Swal.fire({
                title: "Enter your homie's username",
                input: 'text',
                inputLabel: "My homie's username",
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return "You can't leave this blank, YO!"
                    }
                }
            })
                .then((userName) => {
                    const addedUser = userName.value;

                    userByName({
                        variables: {
                            username: addedUser,
                        }
                    })
                    setState(true);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        if ((data !== undefined) && (data.userByName !== null) && (state)) {

            const userData = loading ? 'Loading...' : data.userByName._id;
            console.log(userData);

            const { groupData } = addGroupMember({
                variables: {
                    userId: userData,
                    groupId: currentGroup,
                    admin: currentUser.data._id
                },
            }).then(() => {

                setState(false);
            })
        }

        return (
            <button className='invite-btn' onClick={handleClick}>
                <img className='invite-icon' src={inviteBtn} alt='invite button' />
            </button>
        )

    }

    return (
        <>
            <div className='chat-name'>
                <h2> {loading ? (<div>Loading...</div>) : data.group.name} </h2>
                {/* TODO: Add logo button for photos */}
                {/* <button onClick={ () => navigate(<Photos/>) }>PHOTOS</button> */}
                {evaluateAdmin() ? <AddGroupMember /> : null}
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