import React from "react";

import { useQuery } from '@apollo/client';

import './assets/css/mygroups.css';

import Auth from "../../utils/auth";

// import queries
import { QUERY_USER } from "../../utils/queries";

// import images
import bricksImg from './assets/img/bricks.jpg';
import paintSplatter10Img from './assets/img/paintsplatter10.jpg';
import paintSwirlImg from './assets/img/paintswirl.jpg';
import paintSwirl2Img from './assets/img/paintswirl2.jpg';
import paintSwirl3Img from './assets/img/paintswirl3.jpg';

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
    const userGroupsNames = [];
    const userGroupsIds = [];

    // push all relevant information to the two arrays
    for (let i = 0; i < userGroups.length; i++) {
        userGroupsNames.push(userGroups[i].name);
        userGroupsIds.push(userGroups[i]._id);
    }

    // array of images
    const images = [bricksImg, paintSplatter10Img, paintSwirlImg, paintSwirl2Img, paintSwirl3Img];

    const random = Math.floor(Math.random() * images.length);

    // set button style here instead of css so we can be dynamic
    const buttonStyle = {
        backgroundImage: `url(${images[random]})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    }

    // in the return we will map over the information and since the index length will be the same for both arrays, it makes it that much easier to get the information we need!
// TODO: render a message that tells user to head to create a group if they do not have any created
    return (
        <>
            <h1 className="myGroups-title">{loading ? (
                <div>Loading...</div>
            ) : `${data.user.username}'s Groups`}</h1>
            <section className="groups-section">
            {loading ? (
                <div>Loading...</div>
            ) : userGroupsNames.map((names, index) =>
                <button style={buttonStyle} className="groups-button" data-group-id={userGroupsIds[index]} key={names.replace(/\s/g, "")}>{names}</button>
            )}
            </section>
        </>
    )
}

export default MyGroups;