import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import classesReducer from '../features/classes/classesSlice';
import reservationsReducer from '../features/reservations/reservationsSlice';
import sessionReducer from '../auth/sessionSlice';
import reservePageReducer from '../features/reserve/reservePageSlice';

const store = configureStore({
  reducer: {
    classes: classesReducer,
    reservations: reservationsReducer,
    users: sessionReducer,
    reserve: reservePageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
