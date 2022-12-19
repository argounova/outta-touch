import React from "react";

const LeaveGroup = () => {

    const currentGroup = localStorage.getItem('currentGroupChat');
    const currentUser = localStorage.getItem('currentUser');

    return(
        <button>Leave Group</button>
    )
}

export default LeaveGroup;