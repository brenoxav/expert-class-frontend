import './ReservationsPage.css';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ReservationsPage() {
  const { reservations } = useSelector((state) => state.reservations);

  const reservationsList = reservations.map((r) => (
    <div key={r.id} className="reservation-item">
      <h3>{r.class_id}</h3>
      <h4>{r.user_id}</h4>
      <p>{r.date}</p>
      <p>{r.city}</p>
    </div>
  ));

  return (
    <div>
      <h1>Reservations Page</h1>
      {reservationsList}
    </div>
  );
}
