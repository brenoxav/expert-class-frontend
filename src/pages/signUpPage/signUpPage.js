import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import styles from './signUpPage.module.css';
import { signUpUser, loggedInStatus, authErrors } from '../../auth/sessionSlice';
import FlashMessage from '../../components/flashMessage/flashMessage';

function SignUpPage() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(loggedInStatus);
  const error = useSelector(authErrors);
  const history = useHistory();
  const initialFormData = { username: '', name: '' };
  const initialFormMessage = { message: '', display: false, type: null };

  const [formData, setFormData] = useState(initialFormData);
  const [formMessage, setFormMessage] = useState(initialFormMessage);

  if (loggedIn) {
    return (<Redirect to="classes" />);
  }

  const flashMessageTimeout = () => setTimeout(() => setFormMessage(initialFormMessage), 4000);

  useEffect(() => {
    if (error) {
      setFormMessage({ message: error, display: true, type: 'alert' });
      flashMessageTimeout();
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resultAction = await dispatch(signUpUser(formData));
      const originalPromiseResult = unwrapResult(resultAction);
      if (originalPromiseResult.status === 'created') {
        history.replace('classes');
      }
    } catch (rejectedValueOrSerializedError) {
      history.replace('/');
    }
  };

  return (
    <div className={styles.mainContainer}>
      { formMessage.display
      && <FlashMessage message={formMessage.message} type={formMessage.type} /> }

      <div className={styles.innerContainer}>
        <h2 className={styles.title}>Sign Up</h2>

        <form className={styles.signInForm} onSubmit={handleSubmit}>
          <input className={styles.formInput} onChange={handleChange} value={formData.username} type="text" name="username" id="username" placeholder="Please enter your username" minLength="6" maxLength="20" required />
          <input className={styles.nameInput} onChange={handleChange} value={formData.name} type="text" name="name" id="name" placeholder="Please enter your name" maxLength="24" required />
          <input className={styles.formSubmit} type="submit" value="Sign up" />
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
