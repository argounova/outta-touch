import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

import './assets/css/login.css';

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

      Auth.login(data.login.token);
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
          <h2 className='login-heading'>Log In Below!</h2>
          <form className='custom-form' onSubmit={handleFormSubmit}>
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
            <button className='login-button' type='submit'>Login</button>
          </form>
      {error && (
        <div>{error.message}</div>
      )}
    </>
  );
};

export default Login;
