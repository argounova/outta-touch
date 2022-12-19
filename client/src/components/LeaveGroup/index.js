import React from "react";

import { LEAVE_GROUP } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import Auth from "../../utils/auth";
import './assets/css/leavegroup.css';


const LeaveGroup = () => {

    const navigate = useNavigate();
    const currentGroup = localStorage.getItem('currentGroupChat');
    const currentUser = Auth.getUser();

    const [leaveGroup, { error }] = useMutation(LEAVE_GROUP);

    const handleLeave = async (e) => {
        const { data } = await leaveGroup({
            variables: {
                groupId: currentGroup,
                userId: currentUser.data._id,
            }
        });

        navigate('/dashboard', {replace: true});

    }

    return(
        <button className="leave-button" onClick={handleLeave}>Leave Group</button>
    )
}

export default LeaveGroup;