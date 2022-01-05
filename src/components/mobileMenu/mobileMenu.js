import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './mobileMenu.module.scss'

const MobileMenu = () => {
  const mobileNav = document.querySelector('.overlay-nav');
  const mobileNavLinks = document.querySelector('.overlay-nav__nav-list');
  const copyright = document.querySelector('.overlay-nav__copyright');

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  }

  useEffect(() => {
    if (open) {
      mobileNav.style.width = '100%';
      mobileNavLinks.style.transform = 'translateX(0%)';
      mobileNavLinks.style.left = '0';
      copyright.style.width = '100%';
      copyright.style.left = '0';
    }
  }, [open])

  return (
    <button
      className={styles.mobileMenu}
      onClick={handleClick}
    >
      <i className={`fas fa-bars ${styles.menuIcon}`}></i>
    </button>
  )
}

MobileMenu.propTypes = {

}

export default MobileMenu;
