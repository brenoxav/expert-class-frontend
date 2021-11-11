import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './dropdown.module.scss';

function Dropdown({
  title, items, handleFormChange, valueName,
  keyName, toggleDropdownMenu, open, reset, toggleResetForm,
}) {
  const [selection, setSelection] = useState(null);
  const [dropdownTitle, setDropdownTitle] = useState(title);

  useEffect(() => {
    if (selection) {
      handleFormChange(keyName, selection.id);
      setDropdownTitle(selection[valueName]);
    }
  }, [selection]);

  useEffect(() => {
    if (reset) {
      setSelection(null);
      setDropdownTitle(title);
      toggleResetForm();
    }
  }, [reset]);

  const handleOnClick = (item) => {
    setSelection(item);
    toggleDropdownMenu(keyName);
  };

  const isItemInSelection = (item) => {
    if (selection && selection.id === item.id) {
      return true;
    }
    return false;
  };

  return (
    <div id={keyName} className={styles.ddWrapper}>
      <div
        tabIndex={0}
        className={styles.ddHeader}
        role="button"
        onKeyPress={() => toggleDropdownMenu(keyName)}
        onClick={() => toggleDropdownMenu(keyName)}
      >
        <div className={styles.ddHeader_title}>
          <p className={styles.ddHeader_title__bold}>{dropdownTitle}</p>
        </div>
        <div className={styles.ddHeader_icon}>
          <p>{open[keyName] ? <i className="far fa-caret-square-up" /> : <i className="far fa-caret-square-down" />}</p>
        </div>
      </div>
      {open[keyName] && (
        <ul className={styles.ddList}>
          {items.map((item) => (
            <li key={item.id}>
              <button id={`${keyName}-btn`} type="button" onClick={() => handleOnClick(item)}>
                <span>{item[valueName]}</span>
                <span>{isItemInSelection(item) && 'Selected'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    Object,
  })).isRequired,
  handleFormChange: PropTypes.func.isRequired,
  valueName: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
  toggleDropdownMenu: PropTypes.func.isRequired,
  open: PropTypes.shape({
    course_id: PropTypes.bool.isRequired,
    city_id: PropTypes.bool.isRequired,
  }).isRequired,
  reset: PropTypes.bool.isRequired,
  toggleResetForm: PropTypes.func.isRequired,
};

export default Dropdown;
