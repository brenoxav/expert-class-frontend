import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservations: [
    {
      id: 999,
      user_id: 999,
      class_id: 999,
      date: '2021-10-11',
      city: 'Tokio, Japan',
    },
  ],
};

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    addReservation: (state, action) => [...state, action.payload],
  },
});

export const { addReservation } = reservationsSlice.actions;

export default reservationsSlice.reducer;
