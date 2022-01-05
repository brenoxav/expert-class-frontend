import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HashRouter as Router, Switch, Route,
} from 'react-router-dom';
import { loggedInStatus, loginStatus, status } from './auth/sessionSlice';
import ClassesPage from './pages/classesPage/classesPage';
import LandingPage from './pages/landingPage/landingPage';
import NavPanel from './components/navPanel/navPanel';
import MobileMenu from './components/mobileMenu/mobileMenu';
import ReservePage from './pages/reservePage/reservePage';
import ReservationsPage from './pages/reservationsPage/reservationsPage';
import AddClassPage from './pages/addClassPage/addClassPage';
import RemoveClassPage from './pages/removeClassPage/removeClassPage';
import ClassDetails from './pages/classDetailsPage/classDetailsPage';
import SignInPage from './pages/signInPage/signInPage';
import SignUpPage from './pages/signUpPage/signUpPage';
import PrivateRoute from './components/privateRoute/privateRoute';
import LoadAnimation from './components/loadAnimation/loadAnimation';

function App() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(loggedInStatus);
  const sessionStatus = useSelector(status);

  useEffect(() => {
    if (sessionStatus === 'idle') {
      dispatch(loginStatus());
    }
  }, []);

  if (sessionStatus === 'loading') {
    return (
      <section className="spinner-container">
        <LoadAnimation />
      </section>
    );
  }

  return (
    (sessionStatus === 'fulfilled')
    && (
    <Router>
      <div className="App">
        { loggedIn && <NavPanel />}
        { loggedIn && <MobileMenu />}

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
