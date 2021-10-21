import { configureStore } from '@reduxjs/toolkit';
import classesSlice from '../features/classes/classesSlice'; // eslint-disable-line
import reservationsSlice from '../features/reservations/reservationsSlice'; // eslint-disable-line

const store = configureStore({
  reducer: {
    classes: classesSlice,
    reservations: reservationsSlice,
  },
});

export default store;
