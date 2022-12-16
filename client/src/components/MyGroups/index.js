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

    const { loading, data } = useQuery(QUERY_USER,
        {
            variables: {
                userId: userData.data._id
            }
        });

        const userGroups = loading ? 'Loading' : data.user.groups;

        // console.log(userGroups);

        let userGroupsNames = [];
        let userGroupsIds = [];

        for (let i = 0; i < userGroups.length; i++) {
            userGroupsNames.push(userGroups[i].name);
            userGroupsIds.push(userGroups[i]._id);
        }
        

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