import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

import './assets/login.css';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token, data.login.user._id);
    } catch (error) {
      console.log(error);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <>
      {data ? (
        // TODO: Rework this message as we don't want to re-route back to the homepage on a successful login - we want to show them their dashboard
        <p>Successfully logged in! You may now head{' '}<Link to='/'>back to the hompage.</Link></p>
      ) : (
        <>
          <h2 className='login-heading'>Sign in below!</h2>
          <form className='custom-form' onSubmit={handleFormSubmit}>
            <input
              placeholder='Your email'
              name='email'
              type='email'
              value={formState.email}
              onChange={handleChange}
            />
            <input
              placeholder='Your password'
              name='password'
              type='password'
              value={formState.password}
              onChange={handleChange}
            />
            <button className='login-button' type='submit'>Login</button>
          </form>
        </>
      )}
      {error && (
        <div>{error.message}</div>
      )}
    </>
  );
};

export default Login;
