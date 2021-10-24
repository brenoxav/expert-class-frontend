import React from 'react';
import styles from './myReservationsPage.module.css';
// import { useSelector } from 'react-redux';

export default function MyReservationsPage() {
  // const user = useSelector(currentUser);
  const user = { user_id: 999, username: 'Julius', name: 'Mih' };
  // const { reservations } = useSelector((state) => state.reservations);

  const reservations = [
    {
      id: 994,
      user_id: 999,
      class_id: 999,
      title: 'Pianno',
      date: '2021-10-11',
      city: 'Tokio, Japan',
    },
    {
      id: 999,
      user_id: 999,
      class_id: 999,
      title: 'Music',
      date: '2021-10-11',
      city: 'Yaounde, Cameroon',
    },
    {
      id: 999,
      user_id: 996,
      class_id: 999,
      title: 'Gymnastic',
      date: '2021-10-11',
      city: 'Tokio, Japan',
    },
    {
      id: 992,
      user_id: 999,
      class_id: 999,
      title: 'Web development',
      date: '2021-10-11',
      city: 'Lagos, Nigeria',
    },
    {
      id: 999,
      user_id: 995,
      class_id: 999,
      title: 'Computer Science',
      date: '2021-10-11',
      city: 'Tokio, Japan',
    },
    {
      id: 993,
      user_id: 999,
      class_id: 999,
      title: 'Digital Entreprenaurship',
      date: '2021-10-11',
      city: 'Texas, USA',
    },
  ];

  const myReservationsList = reservations.filter((r) => r.user_id === user.user_id).map((r) => (
    <div key={r.id} className={styles.reservationItem}>
      <h3 className={styles.item}>
        Title:
        {' '}
        {r.title}
      </h3>
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
      {myReservationsList}
    </div>
  );
}
