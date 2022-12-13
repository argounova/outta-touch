import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

import './assets/css/signup.css'

const Signup = () => {

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  /// UPDATES STATE BASED ON INPUT ///
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  /// HANDLE SUBMISSION OF FORM ///
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token, data.addUser.user._id);
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <>
      {data ? (
        // TODO: Rework this message as we don't want to re-route back to the homepage on a successful login - we want to show them their dashboard
        <p variant='subtitle1'>Successfully created an account. You may now head{' '}<Link to='/'>back to the hompage.</Link></p>
      ) : (
        <>
          <h2 className='signup-heading'>Sign Up Below!</h2>
          <form className='custom-form' onSubmit={handleFormSubmit}>
            <input
              placeholder='Username'
              name='username'
              type='text'
              value={formState.username}
              onChange={handleChange}
            />
            <input
              placeholder='Email'
              name='email'
              type='text'
              value={formState.email}
              onChange={handleChange}
            />
            <input
              placeholder='Password'
              name='password'
              type='password'
              value={formState.password}
              onChange={handleChange}
            />
            <button className='signup-button' type='submit'>Sign Up</button>
          </form>
        </>
      )}
      {error && (
        <div>
          {error.message}
        </div>
      )}
    </>
  );
};

export default Signup;
