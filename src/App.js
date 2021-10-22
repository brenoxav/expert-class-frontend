import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { loginStatus, loginUser, logoutUser, currentUser, loggedInStatus } from './auth/sessionSlice';
import { isCSRFToken } from './app/getCSRFToken';
import ClassesPage from './features/classes/ClassesPage'; // eslint-disable-line
import LandingPage from './features/landingPage/landingPage';
import Session from './auth/session';
import NavPanel from './features/navPanel/NavPanel';
import ReservePage from './features/reserve/ReservePage';
import ReservationsPage from './features/reservations/ReservationsPage'; // eslint-disable-line
import AddClassPage from './features/addClass/AddClassPage';
import RemoveClassPage from './features/removeClass/RemoveClassPage';

function App() {
  console.log('isCSRFToken?: ', (isCSRFToken()) ? 'true' : 'false');
  const dispatch = useDispatch();

  const user = useSelector(currentUser);
  const loggedIn = useSelector(loggedInStatus)

  return (
    <div className="App">
      <Router>
        <NavPanel />
      </Router>
      <div className="app-content">
        <Router>
          <Switch>
            <Route path="/classes">
              <ClassesPage />
            </Route>
            <Route path="/reserve">
              <ReservePage />
            </Route>
            <Route path="/my-reservations">
              <ReservationsPage />
            </Route>
            <Route path="/add-class">
              <AddClassPage />
            </Route>
            <Route path="/remove-class">
              <RemoveClassPage />
            </Route>
            <Route path="/">
              {/* <LandingPage /> */}
              <Session />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
