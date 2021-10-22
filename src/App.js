import './App.css';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import ClassesPage from './features/classes/ClassesPage'; // eslint-disable-line
import LandingPage from './features/landingPage/landingPage';
import NavPanel from './features/navPanel/NavPanel';
import ReservePage from './features/reserve/ReservePage';
import ReservationsPage from './features/reservations/ReservationsPage'; // eslint-disable-line
import AddClassPage from './features/addClass/AddClassPage';
import RemoveClassPage from './features/removeClass/RemoveClassPage';
import ClassDetails from './features/ClassDetails/ClassDetails';

function App() {
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
