import React, { useState } from 'react';

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
      {data ? window.location.replace('/dashboard/:userId') : (
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
              type='email'
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
