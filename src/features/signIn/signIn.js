import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './signInSlice';
import axios from 'axios';

const signIn = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.user);
  const loggedInStatus = useSelector((state) => state.users.logged_in);

  const [user, setUser] = useState(currentUser);

  const [loggedIn, setLoggedIn] = useState(loggedInStatus);

  const [input, setInput] = useState('');

  useEffect(() => {
    if (currentUser.name !== 'no one here') {
      setUser(currentUser);
      setLoggedIn(true);
    }
  }, [currentUser]);

  useEffect(() => {
    const setSessionCookie = async () => {
      await axios.get('/', { withCredentials: true })
    };
    setSessionCookie();
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    console.log('Form input: ', input);
    dispatch(loginUser(input));
  };

  const handleChange = (event) => setInput(event.target.value);

  return (
    <div>
      <h1>
        Hello There, &quot;
        {user.name}
        &quot;
      </h1>
      <p>
        Logged In:
        {loggedIn && 'true'}
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
    </div>
  );
};

export default signIn;
