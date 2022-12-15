import React from "react";

import { useQuery } from '@apollo/client';

import './assets/css/mygroups.css';

import Auth from "../../utils/auth";

import { QUERY_USER } from "../../utils/queries";

const MyGroups = () => {

// get user information
const userData = Auth.getUser();

const { loading, data } = useQuery(QUERY_USER, 
    {variables: {
        userId: userData.data._id
    }});

    // let the data load then set the groups object to userGroups
    const userGroups = loading ? 'Loading' : data.user.groups;

    // intialize an array for us to push group Id's to
    let groupIdArray = [];

    // push each group id to the group id array so we can query the group model
    for (let i = 0; i < userGroups.length; i++) {
        const groupId = userGroups[i]._id;

        groupIdArray.push(groupId);
    }
    console.log(groupIdArray);

// Define this component here since we won't need it anywhere else
const RenderGroups = () => {

}

    return (
        <>
            <h1 className="myGroups-title">{loading ? 'Loading' : `${data.user.username}'s Groups`}</h1>
            <section>
                {/* Local Component to conditionally render groups based on number in user's group array */}
            </section>
        </>
    )
}

export default MyGroups;