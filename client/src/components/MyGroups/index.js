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

        // console.log(loading ? 'loading' : data.user.groups);

        let groupIds = [];

        function iterateGroupIds() {
            if (loading) {
                return 'Loading'
            }
            else {
                for (let i = 0; i < data.user.groups.length; i++) {
                groupIds.push(data.user.groups[i]._id)
                }
            }
        }

        iterateGroupIds();

        console.log(groupIds);

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