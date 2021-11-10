import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import classesReducer from '../features/classes/classesSlice';
import reservationsReducer from '../features/reservations/reservationsSlice';
import sessionReducer from '../auth/sessionSlice';
import citiesReducer from '../features/reserve/CitiesSlice';
import classDetailsReducer from '../features/ClassDetails/classDetailsSlice';

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
