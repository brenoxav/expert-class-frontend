import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import styles from './signInPage.module.css';
import { loginUser, loggedInStatus, authErrors } from '../../auth/sessionSlice';
import SpeechBubble from '../../common/speechBubble';

function SignInPage() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(loggedInStatus);
  const history = useHistory();
  // const sessionStatus = useSelector(status);


  // const { state } = useLocation();





  // console.log('from location? ', from);


  // const [fromPath, setFromPath] = useState('/classes');



  // if (state) setLocation(state.from);

  const error = useSelector(authErrors);



  // useEffect(() => {
  //   if (loggedIn) {
  //     // console.log('thsi is the state from UseLocation: ', state?.from)
  //     history.replace(from);
  //     // if (redirectToReferrer === true) {
  //     //   return <Redirect to={state?.from || '/classes'} />
  //     // }
  //   }
  // }, [loggedIn]);

  const [formData, setFormData] = useState({ username: '' });
  const [formMessage, setFormMessage] = useState({ message: error, display: false });

  useEffect(() => {
    if (error) {
      setFormMessage({ message: error, display: true });
    }
  }, [error]);

  const change = (e) => setFormData({ ...formData, username: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('this is the state location from useLocation: ', state?.from.pathname)
    // if (state?.from.pathname) {
    //   setLocation(state?.from.pathname);
    // }
    // console.log('new location? ', location);
    dispatch(loginUser(formData.username));
    // setFromPath(from);
  };

  if (loggedIn) {
    history.replace('classes');
  }

  return (
    <div className={styles.mainContainer}>
      { formMessage.display && <SpeechBubble message={formMessage.message} /> }

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
