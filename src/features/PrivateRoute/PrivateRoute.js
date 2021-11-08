import React from 'react';
import { useSelector } from 'react-redux';
import { loggedInStatus } from '../../auth/sessionSlice';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component,...rest }) => {
  const loggedIn = useSelector(loggedInStatus);

  return (
    <Route
      {...rest}
      render={(props) => loggedIn
        ? ( <Component {...props } /> )
        : ( <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} /> )}
    />
  )
}

export default PrivateRoute;
