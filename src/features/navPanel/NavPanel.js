import './NavPanel.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function NavPanel() {
  return (
    <nav className="nav-panel">
      <NavLink to="/classes" className="nav-link" activeClassName="active-nav-link" exact>
        Classes
      </NavLink>
      <NavLink to="/reserve" className="nav-link" activeClassName="active-nav-link" exact>
        Reserve
      </NavLink>
      <NavLink to="/my-reservations" className="nav-link" activeClassName="active-nav-link" exact>
        My Reservations
      </NavLink>
      <NavLink to="/add-class" className="nav-link" activeClassName="active-nav-link" exact>
        Add Class
      </NavLink>
      <NavLink to="/remove-class" className="nav-link" activeClassName="active-nav-link" exact>
        Remove Class
      </NavLink>
    </nav>
  );
}

export default NavPanel;
