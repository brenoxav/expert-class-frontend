import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './dropdown.module.scss';

function Dropdown({
  title, items = [], handleFormChange, valueName,
  keyName,
}) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState();
  const [dropdownTitle, setDropdownTitle] = useState(title);

  useEffect(() => {
    if (selection) {
      handleFormChange(keyName, selection.id);
      setDropdownTitle(selection[valueName]);
    }
  }, [selection]);

  const toggle = () => setOpen(!open);

  const handleOnClick = (item) => {
    setSelection(item);
    toggle(!open);
  };

  const isItemInSelection = (item) => {
    if (selection && selection.id === item.id) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.ddWrapper}>
      <div
        tabIndex={0}
        className={styles.ddHeader}
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className={styles.ddHeader_title}>
          <p className={styles.ddHeader_title__bold}>{dropdownTitle}</p>
        </div>
        <div className={styles.ddHeader_icon}>
          <p>{open ? <i className="far fa-caret-square-up" /> : <i className="far fa-caret-square-down" />}</p>
        </div>
      </div>
      {open && (
        <ul className={styles.ddList}>
          {items.map((item) => (
            <li className={styles.ddList} key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
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
};

export default Dropdown;
