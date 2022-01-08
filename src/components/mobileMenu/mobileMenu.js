import React, { useEffect, useState } from 'react';
import styles from './mobileMenu.module.scss';

const MobileMenu = () => {
  const mobileNav = document.querySelector('.overlay-nav');
  const mobileNavLinks = document.querySelector('.overlay-nav__nav-list');
  const copyright = document.querySelector('.overlay-nav__copyright');

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      mobileNav.classList.add('overlay-nav--show');
      mobileNavLinks.classList.add('overlay-nav__nav-list--overlay-transition');
      copyright.classList.add('overlay-nav__copyright--show');
    } else if (!open && mobileNav) {
      mobileNav.classList.remove('overlay-nav--show');
      mobileNavLinks.classList.remove('overlay-nav__nav-list--overlay-transition');
      copyright.classList.remove('overlay-nav__copyright--show');
    }
  }, [open]);

  return (
    <button
      type="button"
      className={styles.mobileMenu}
      onClick={handleClick}
    >
      {open ? <i className={`far fa-times ${styles.menuIcon}`} /> : <i className={`fas fa-bars ${styles.menuIcon}`} />}
    </button>
  );
};

export default MobileMenu;
