import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from '../../common/Carousel/Carousel';
import {
  fetchClassesData, currentClasses, classesStateStatus, classesErrorMessage,
} from './classesPageSlice';
import styles from './classesPage.module.scss';

const ClassesPage = () => {
  const dispatch = useDispatch();
  const classes = useSelector(currentClasses);
  const fetchStatus = useSelector(classesStateStatus);
  const errorMessage = useSelector(classesErrorMessage);

  useEffect(() => {
    if (fetchStatus === 'idle' || errorMessage === 'Error fetching data.') {
      dispatch(fetchClassesData());
    }
  }, []);

  return (
    (fetchStatus === 'fulfilled')
    && (
    <div className={`${styles.classesContainer} private-page-container`}>
      <h2 className={styles.heading}>Classes</h2>
      <Carousel classes={classes} />
    </div>
    )
  );
};

export default ClassesPage;
