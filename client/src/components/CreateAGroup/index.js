import React, { useState } from "react";
import { useMutation } from '@apollo/client';

import Auth from "../../utils/auth";

// CSS
import './assets/css/createagroup.css';

// import mutations
import { CREATE_GROUP } from '../../utils/mutations'

const CreateAGroup = () => {

    const userData = Auth.getUser();

    console.log(userData.data._id);

    // const adminUserId = userData.data._id;

    const [formState, setFormState] = useState({ groupName: '', password: '' });
    const [createGroup, { error }] = useMutation(CREATE_GROUP);

    /// HANDLE CHANGE ///
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    /// FORM SUBMISSION ///
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await createGroup({
                variables: {
                    name: formState.groupName,
                    admin: userData.data._id,
                },
            });
            Auth.loggedIn();
        } catch (error) {
            console.log(error);
        }

        setFormState({
            groupName: '',
            password: '',
        });
    };

    return (
        <>
            <h1 className='create-title'>Create A Group</h1>
            <form className='custom-form' onSubmit={handleFormSubmit}>
                <input
                    placeholder='Enter Group Name'
                    name='groupName'
                    type='text'
                    value={formState.groupName}
                    onChange={handleChange}
                />
                <input
                    placeholder='Enter Group Password'
                    name='password'
                    type='password'
                    value={formState.password}
                    onChange={handleChange}
                />
                <button className='create-button' type='submit'>Create Group</button>
            </form>
            {error && (
                <div>{error.message}</div>
            )}
        </>
    )
}

export default CreateAGroup;