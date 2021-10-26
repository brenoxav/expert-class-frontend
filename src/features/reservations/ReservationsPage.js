import './ReservationsPage.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, userReservations } from './reservationsSlice';

const ReservationsPage = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(userReservations);
  useEffect(() => {
    dispatch(fetchReservations());
  }, []);

  const reservationsList = reservations.map((r) => (
    <div key={r.id} className="reservation-item">
      <h3>{r.course}</h3>
      <h4>{r.user}</h4>
      <p>{r.date}</p>
      <p>{r.city}</p>
    </div>
  ));

  return (
    <div style={{ marginLeft: 400 }}>
      <h1>Reservations Page</h1>
      {reservations && reservationsList}
    </div>
  );
};

export default ReservationsPage;
