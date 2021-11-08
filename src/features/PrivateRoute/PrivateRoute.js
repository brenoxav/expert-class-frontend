import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loggedInStatus } from '../../auth/sessionSlice';

const PrivateRoute = ({ component: Component }) => {
  const loggedIn = useSelector(loggedInStatus);
  const location = useLocation();

  return (
    <Route
      render={() => (loggedIn
        ? (<Component />)
        : (<Redirect to={{ pathname: '/sign-in', state: { from: location } }} />))}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
