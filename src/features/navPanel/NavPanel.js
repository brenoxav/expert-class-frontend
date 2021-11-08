import './NavPanel.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { loggedInStatus, logoutUser } from '../../auth/sessionSlice';

function NavPanel() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const loggedIn = useSelector(loggedInStatus);

  // useEffect(() => {
  //   if (!loggedIn) {
  //     history.push("/");
  //   }
  // }, [loggedIn]);

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    history.push("/");
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
