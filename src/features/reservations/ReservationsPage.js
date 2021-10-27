import React from 'react';
import styles from './Reservations.module.css';
// import { useSelector } from 'react-redux';

export default function ReservationsPage() {
//   const reservations = useSelector(userReservations);
//   useEffect(() => {
//     dispatch(fetchReservations());
//   }, []);

  //   const reservationsList = reservations.map((r) => (
  //     <div key={r.id} className="reservation-item">
  //       <h3>{r.course}</h3>
  //       <h4>{r.user}</h4>
  //       <p>{r.date}</p>
  //       <p>{r.city}</p>

  // const user = useSelector(currentUser);
  const user = { user_id: 999, username: 'Jay', name: 'Mih' };
  // const { reservations } = useSelector((state) => state.reservations);

  const reservations = [
    {

      course: 'Computer Programming',
      user: 'Arturo',
      date: '2021-10-11',
      city: 'Tokio, Japan',
    },
    {
      course: 'Music',
      user: 'Breno',
      date: '2021-10-11',
      city: 'Yaounde, Cameroon',
    },
    {
      course: 'Web Design',
      user: 'Francis',
      date: '2021-10-11',
      city: 'Tokio, Japan',
    },
    {
      course: 'Gymnatic',
      user: 'Jay',
      date: '2021-10-11',
      city: 'Lagos, Nigeria',
    },
    {
      course: 'Fishing',
      user: 'Jay',
      date: '2021-10-11',
      city: 'Tokio, Japan',
    },
    {
      course: 'Film making',
      user: 'Jay',
      date: '2021-10-11',
      city: 'Texas, USA',
    },
  ];

  const ReservationsList = reservations.filter((r) => r.user === user.username).map((r) => (
    <div key={r.id} className={styles.reservationItem}>
      <h3 className={styles.item}>
        Title:
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
