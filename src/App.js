import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HashRouter as Router, Switch, Route,
} from 'react-router-dom';
import { loggedInStatus, loginStatus, status } from './auth/sessionSlice';
import ClassesPage from './pages/classesPage/classesPage';
import LandingPage from './pages/landingPage/landingPage';
import NavPanel from './components/navPanel/navPanel';
import ReservePage from './pages/reservePage/reservePage';
import ReservationsPage from './pages/reservationsPage/reservationsPage';
import AddClassPage from './pages/addClassPage/addClassPage';
import RemoveClassPage from './pages/removeClassPage/removeClassPage';
import ClassDetails from './pages/classDetailsPage/classDetailsPage';
import SignInPage from './pages/signInPage/signInPage';
import SignUpPage from './pages/signUpPage/signUpPage';
import PrivateRoute from './components/privateRoute/privateRoute';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(loggedInStatus);
  const sessionStatus = useSelector(status);

  useEffect(() => {
    if (sessionStatus === 'idle') {
      dispatch(loginStatus());
    }
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
