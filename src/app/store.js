import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import classesReducer from '../features/classes/classesSlice';
import reservationsReducer from '../features/reservations/reservationsSlice';
import sessionReducer from '../auth/sessionSlice';
import classDetailsReducer from '../features/ClassDetails/classDetailsSlice';
import removeClassReducer from '../features/removeClass/removeClassSlice';

const store = configureStore({
  reducer: {
    classes: classesReducer,
    classesObj: removeClassReducer,
    classDetails: classDetailsReducer,
    reservations: reservationsReducer,
    users: sessionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
