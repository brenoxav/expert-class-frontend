import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import classesSlice from '../features/classes/classesSlice'; // eslint-disable-line
import reservationsSlice from '../features/reservations/reservationsSlice'; // eslint-disable-line
import signInReducer from '../features/signIn/signInSlice';

const store = configureStore({
  reducer: {
    classes: classesSlice,
    reservations: reservationsSlice,
    users: signInReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
