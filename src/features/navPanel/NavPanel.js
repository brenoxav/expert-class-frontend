import './NavPanel.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logoutUser } from '../../auth/sessionSlice';

function NavPanel() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    history.replace('/');
  };

  return (
    <nav className="nav-panel">
      <NavLink to="/classes" className="nav-link" activeClassName="active-nav-link" exact>
        Classes
      </NavLink>
      <NavLink to="/reserve" className="nav-link" activeClassName="active-nav-link" exact>
        Reserve
      </NavLink>
      <NavLink to="/reservations" className="nav-link" activeClassName="active-nav-link" exact>
        My Reservations
      </NavLink>
      <NavLink to="/add-class" className="nav-link" activeClassName="active-nav-link" exact>
        Add Class
      </NavLink>
      <NavLink to="/remove-class" className="nav-link" activeClassName="active-nav-link" exact>
        Remove Class
      </NavLink>
      <button type="button" className="logOutBtn" onClick={handleLogoutClick}>Logout</button>

    </nav>
  );
}

export default NavPanel;
