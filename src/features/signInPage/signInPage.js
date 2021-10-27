import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './signInPage.module.css';
import { loginUser, loggedInStatus } from '../../auth/sessionSlice';

function SignInPage() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(loggedInStatus);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push('/classes');
    }
  }, [loggedIn]);

  const [formData, setFormData] = useState({ username: '' });

  const change = (e) => setFormData({ ...formData, username: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(formData.username));
  };

  return (
    <div className={styles.mainContainer}>
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
          />
          <input className={styles.formSubmit} type="submit" value="Sign in" />
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
