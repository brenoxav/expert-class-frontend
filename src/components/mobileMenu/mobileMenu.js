import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { logoutUser } from '../../auth/sessionSlice';
import styles from './mobileMenu.module.scss';

const MobileMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogoutClick = async () => {
    const resultAction = await dispatch(logoutUser());
    const originalPromiseResult = unwrapResult(resultAction);
    if (originalPromiseResult.logged_out) {
      history.replace('/');
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.mobileMenu}
        onClick={handleClick}
      >
        {open ? <i className={`far fa-times ${styles.menuIcon}`} /> : <i className={`fas fa-bars ${styles.menuIcon}`} />}
      </button>

      {/* Nav Links */}
      <div className={open ? `${styles.overlayNav} ${styles.overlayNav__show}` : styles.overlayNav}>
        <nav className={open ? `${styles.overlayNav__navList} ${styles.overlayNav__navList__overlayTransition}` : styles.overlayNav__navList}>
          <NavLink to="/classes" className={styles.navLinkMobile} onClick={handleClick} exact>
            Classes
          </NavLink>
          <NavLink to="/reserve" className={styles.navLinkMobile} onClick={handleClick} exact>
            Reserve
          </NavLink>
          <NavLink to="/reservations" className={styles.navLinkMobile} onClick={handleClick} exact>
            My Reservations
          </NavLink>
          <NavLink to="/add-class" className={styles.navLinkMobile} onClick={handleClick} exact>
            Add Class
          </NavLink>
          <NavLink to="/remove-class" className={styles.navLinkMobile} onClick={handleClick} exact>
            Remove Class
          </NavLink>
        </nav>
        <button type="button" className="button-white logOutBtn" onClick={handleLogoutClick}>Logout</button>
        <p className={open ? `${styles.overlayNav__copyright} ${styles.overlayNav__copyright__show}` : styles.overlayNav__copyright}>
          © Copyright
          <br />
          francisuloko, Mihndim2020, brenoxav, and StarSheriff2
        </p>
      </div>
    </>
  );
};

export default MobileMenu;
