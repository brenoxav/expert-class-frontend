import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Reservations.module.css';
import { fetchReservations, userReservations, reservationsState } from './reservationsSlice';

export default function ReservationsPage() {
  const dispatch = useDispatch();
  const reservations = useSelector(userReservations);
  const { status: reservationsStatus } = useSelector(reservationsState);

  useEffect(() => {
    if (reservationsStatus === 'idle') {
      dispatch(fetchReservations());
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
