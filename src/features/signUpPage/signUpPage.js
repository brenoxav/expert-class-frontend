import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './signUpPage.module.css';
import { signUpUser, loggedInStatus, authErrors } from '../../auth/sessionSlice';
import SpeechBubble from '../../common/speechBubble';

function SignUpPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector(loggedInStatus);
  const error = useSelector(authErrors);

  const [formData, setFormData] = useState({ username: '', name: '' });
  const [formMessage, setFormMessage] = useState({ message: error, display: false });

  useEffect(() => {
    if (error) {
      setFormMessage({ message: error, display: true });
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpUser(formData));
  };

  if (loggedIn) {
    history.replace('classes');
  }

  return (
    <div className={styles.mainContainer}>
      { formMessage.display && <SpeechBubble message={formMessage.message} /> }

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
