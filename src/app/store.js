import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import classesSlice from '../features/classes/classesSlice'; // eslint-disable-line
import reservationsSlice from '../features/reservations/reservationsSlice'; // eslint-disable-line
import sessionReducer from '../auth/sessionSlice';

const store = configureStore({
  reducer: {
    classes: classesSlice,
    reservations: reservationsSlice,
    users: sessionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
