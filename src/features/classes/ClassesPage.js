import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../../common/Carousel';
import { fetchClassesData, currentClasses, classesStateStatus } from './classesSlice';
import styles from './ClassesPage.module.css';

const ClassesPage = () => {
  const dispatch = useDispatch();
  const classes = useSelector(currentClasses);
  const fetchStatus = useSelector(classesStateStatus);

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchClassesData());
    }
  }, []);

  return (
    (fetchStatus === 'fulfilled')
    && (
    <div className={styles.classesContainer}>
      <h2 className={styles.heading}>Classes</h2>
      <Carousel classes={classes} />
    </div>
    )
  );
};

export default ClassesPage;
