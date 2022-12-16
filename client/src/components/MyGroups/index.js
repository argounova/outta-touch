import React from "react";

import { useQuery } from '@apollo/client';

import './assets/css/mygroups.css';

import Auth from "../../utils/auth";

// import queries
import { QUERY_USER, QUERY_GROUP } from "../../utils/queries";

// MyGroups Component
const MyGroups = () => {

    // get user information
    const userData = Auth.getUser();

    // query the user model using the current logged in users id
    const { loading, data } = useQuery(QUERY_USER,
        {
            variables: {
                userId: userData.data._id
            }
        });

        // let the data load and then save the groups array to userGroups
        const userGroups = loading ? 'Loading' : data.user.groups;

        // console.log(userGroups);


        // initialize two arrays: names for found names and ids to use to query the group model
        let userGroupsNames = [];
        let userGroupsIds = [];

        // push all relevant information to the two arrays
        for (let i = 0; i < userGroups.length; i++) {
            userGroupsNames.push(userGroups[i].name);
            userGroupsIds.push(userGroups[i]._id);
        }
        
// in the return we will map over the information and since the index length will be the same for both arrays, it makes it that much easier to get the information we need!
    return (
        <>
            <h1 className="myGroups-title">{loading ? 'Loading' : `${data.user.username}'s Groups`}</h1>
            <section>
              {userGroupsNames.map((names, index) => 
              <button id={userGroupsIds[index]} key={names}>{names}</button>
              )}
            </section>
        </>
    )
}

export default MyGroups;