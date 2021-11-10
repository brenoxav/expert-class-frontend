import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import classesReducer from '../pages/classesPage/classesPageSlice';
import reservationsReducer from '../pages/reservationsPage/reservationsPageSlice';
import sessionReducer from '../auth/sessionSlice';
import citiesReducer from '../pages/reservePage/citiesSlice';
import classDetailsReducer from '../pages/classDetailsPage/classDetailsPageSlice';

const store = configureStore({
  reducer: {
    classes: classesReducer,
    classDetails: classDetailsReducer,
    cities: citiesReducer,
    reservations: reservationsReducer,
    users: sessionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
