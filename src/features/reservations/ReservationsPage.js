import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './Reservations.module.css';
import { fetchReservations, userReservations } from './reservationsSlice';
import { loggedInStatus, currentUser } from '../../auth/sessionSlice';

export default function ReservationsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const reservations = useSelector(userReservations);
  const loggedIn = useSelector(loggedInStatus);
  const user = useSelector(currentUser);

  useEffect(() => {
    if (!loggedIn) {
      history.push('/');
    } else {
      dispatch(fetchReservations(user.id));
    }
  }, []);

  const ReservationsList = reservations.map((r) => (
    <div key={r.id} className={styles.reservationItem}>
      <h3 className={styles.item}>
        Class:
        {' '}
        {r.course}
      </h3>
      <p className={styles.item}>
        Username:
        {' '}
        {r.user}
      </p>
      <p className={styles.item}>
        Date:
        {' '}
        {r.date}
      </p>
      <p className={styles.item}>
        Location:
        {' '}
        {r.city}
      </p>
    </div>
  ));

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading}>My Reservations</h1>
      {ReservationsList}
    </div>
  );
}
