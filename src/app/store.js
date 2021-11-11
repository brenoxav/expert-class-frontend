import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import classesReducer from '../pages/classesPage/classesPageSlice';
import reservationsReducer from '../pages/reservationsPage/reservationsPageSlice';
import sessionReducer from '../auth/sessionSlice';
import citiesReducer from '../pages/reservePage/citiesSlice';
import classDetailsReducer from '../pages/classDetailsPage/classDetailsPageSlice';

const appReducer = combineReducers({
  classes: classesReducer,
  classDetails: classDetailsReducer,
  cities: citiesReducer,
  reservations: reservationsReducer,
  users: sessionReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'session/logoutUser/fulfilled') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
