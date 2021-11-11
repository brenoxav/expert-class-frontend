import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import styles from './signInPage.module.css';
import { loginUser, loggedInStatus, authErrors } from '../../auth/sessionSlice';
import FlashMessage from '../../components/flashMessage/flashMessage';

function SignInPage() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(loggedInStatus);
  const history = useHistory();
  const error = useSelector(authErrors);
  const { state } = useLocation();
  const redirectPath = state?.from || 'classes';

  const [formData, setFormData] = useState({ username: '' });
  const [formMessage, setFormMessage] = useState({ message: error, display: false });

  if (loggedIn) {
    return (<Redirect to="classes" />);
  }

  useEffect(() => {
    if (error) {
      setFormMessage({ message: error, display: true });
    }
  }, [error]);

  const change = (e) => setFormData({ ...formData, username: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resultAction = await dispatch(loginUser(formData.username));
      const originalPromiseResult = unwrapResult(resultAction);
      if (originalPromiseResult.status === 'created') {
        history.replace(redirectPath);
      }
    } catch (rejectedValueOrSerializedError) {
      setFormMessage({ message: 'There was an error loggin in. Please try again in a moment.', display: true });
    }
  };

  return (
    <div className={styles.mainContainer}>
      { formMessage.display && <FlashMessage message={formMessage.message} /> }

      <div className={styles.innerContainer}>
        <h2 className={styles.title}>Sign In</h2>

        <form className={styles.signInForm} onSubmit={handleSubmit}>
          <input
            className={styles.formInput}
            onChange={change}
            type="text"
            name="username"
            value={formData.username}
            placeholder="Please enter your username"
            required
          />
          <input className={styles.formSubmit} type="submit" value="Sign in" />
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
