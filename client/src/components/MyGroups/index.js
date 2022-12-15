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

        console.log(data);

    // let groupIds = [];

    // if (loading) {
    //     return 'Loading'
    // }
    // else {
    //     for (let i = 0; i < data.user.groups.length; i++) {
    //         groupIds.push(data.user.groups[i]._id)
    //     }
    // }

    // const UserGroups = () => {
    //     const {loading, data} = useQuery(QUERY_GROUP,
    //         {
    //             variables: {
    //                 groupId: [groupIds]
    //             }
    //         })
    //         console.log(loading ? 'Loading' : data);
    // }

    return (
        <>
            {/* <h1 className="myGroups-title">{loading ? 'Loading' : `${data.user.username}'s Groups`}</h1> */}
            <h1 className="myGroups-title">User's Group</h1>
            <section>
                {/* Local Component to conditionally render groups based on number in user's group array */}
                {/* <p>{groupIds.map(id => <li key={id}> {id} </li>)}</p> */}
                {/* < UserGroups /> */}
            </section>
        </>
    )
}

export default MyGroups;