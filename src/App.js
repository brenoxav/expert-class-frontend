import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
// import { currentUser, loggedInStatus } from './auth/sessionSlice';
import { isCSRFToken } from './app/getCSRFToken';
import ClassesPage from './features/classes/ClassesPage'; // eslint-disable-line
import LandingPage from './features/landingPage/landingPage';
import NavPanel from './features/navPanel/NavPanel';
import ReservePage from './features/reserve/ReservePage';
import ReservationsPage from './features/reservations/ReservationsPage'; // eslint-disable-line
import AddClassPage from './features/addClass/AddClassPage';
import RemoveClassPage from './features/removeClass/RemoveClassPage';
import ClassDetails from './features/ClassDetails/ClassDetails';
import SignInPage from './features/signInPage/signInPage';
import SignUpPage from './features/signUpPage/signUpPage';
// import Session from './auth/Session';

function App() {
  useEffect(() => {
    const setSessionCookie = async () => {
      if (!isCSRFToken()) {
        await axios.get('http://localhost:3001/', { withCredentials: true });
      }
    };
    setSessionCookie();
  }, []);

  // These are a global selectors. Every componenet has access to them:
  // const user = useSelector(currentUser);
  // const loggedIn = useSelector(loggedInStatus);

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
            <Route path="/class/:id">
              <ClassDetails />
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
            <Route path="/sign-in">
              <SignInPage />
            </Route>
            <Route path="/sign-up">
              <SignUpPage />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
