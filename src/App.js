import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HashRouter as Router, Switch, Route,
} from 'react-router-dom';
import { loggedInStatus, loginStatus, status } from './auth/sessionSlice';
import ClassesPage from './features/classes/ClassesPage';
import LandingPage from './features/landingPage/landingPage';
import NavPanel from './features/navPanel/NavPanel';
import ReservePage from './features/reserve/ReservePage';
import ReservationsPage from './features/reservations/ReservationsPage';
import AddClassPage from './features/addClass/AddClassPage';
import RemoveClassPage from './features/removeClass/RemoveClassPage';
import ClassDetails from './features/ClassDetails/ClassDetails';
import SignInPage from './features/signInPage/signInPage';
import SignUpPage from './features/signUpPage/signUpPage';
import PrivateRoute from './features/PrivateRoute/PrivateRoute';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(loggedInStatus);
  const sessionStatus = useSelector(status);

  useEffect(() => {
    dispatch(loginStatus());
  }, []);

  return (
    (sessionStatus === 'fulfilled')
    && (
    <Router>
      <div className="App">
        { loggedIn && <NavPanel />}

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <PrivateRoute path="/classes" component={ClassesPage} />
          <PrivateRoute path="/class/:id" component={ClassDetails} />
          <PrivateRoute path="/reserve" component={ReservePage} />
          <PrivateRoute path="/reservations" component={ReservationsPage} />
          <PrivateRoute path="/add-class" component={AddClassPage} />
          <PrivateRoute path="/remove-class" component={RemoveClassPage} />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route component={LandingPage} />
        </Switch>
      </div>
    </Router>
    )
  );
}

export default App;
