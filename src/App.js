import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import ClassesPage from './features/classes/ClassesPage'; // eslint-disable-line
import ClassDetails from './features/classDetails/classDetails';
import ReservationsPage from './features/reservations/ReservationsPage'; // eslint-disable-line
import LandingPage from './features/landingPage/landingPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/classes">
            <ClassesPage />
          </Route>
          <Route path="/class-details">
            <ClassDetails />
          </Route>
          <Route path="/my-reservations">
            <ReservationsPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
