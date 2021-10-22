import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginStatus, loginUser, logoutUser, currentUser, loggedInStatus } from './sessionSlice';
import { isCSRFToken } from '../app/getCSRFToken';
import expertClassAPI from '../app/expertClassAPI';

const Session = () => {
  console.log('isCSRFToken?: ', (isCSRFToken()) ? 'true' : 'false');
  const dispatch = useDispatch();

  const user = useSelector(currentUser);
  const loggedIn = useSelector(loggedInStatus)

  const [input, setInput] = useState('');

  useEffect(() => {
    const setSessionCookie = async () => {
      if (!isCSRFToken()) {
        await axios.get('http://localhost:3001/', { withCredentials: true });
      }
    };
    setSessionCookie();
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser(input));
  };

  const handleChange = (event) => setInput(event.target.value);

  const handleLoginStatusClick = () => dispatch(loginStatus());

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <div style={{ marginLeft: 300}}>
      <h1>
        Hello There, &quot;
        {user.name}
        &quot;
      </h1>
      <p>
        Logged In:
        {loggedIn && 'true' || 'false'}
      </p>
      <h2>Please Sign in</h2>
      <form onSubmit={formSubmitHandler}>

        <div>
          <input
            type="text"
            name="username"
            placeholder="enter your username"
            required
            value={input}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Login
        </button>
      </form>
      <div>

        <button
          type="button"
          onClick={handleLoginStatusClick}
        >
          Check Login Status
        </button>
      </div>

      <div>

        <button
          type="button"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Session;
