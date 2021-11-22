/* eslint-disable react/prop-types */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import TestRenderer from 'react-test-renderer';
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

function render(ui,
  {
    initialState,
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
      initialState,
    }),
    ...renderOptions
  } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

const renderWithRedux = (component,
  {
    initialState, store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
      initialState,
    }),
  } = {}) => ({
  ...TestRenderer.create(<Provider store={store}>{component}</Provider>),
});

export * from '@testing-library/react';

export { render, renderWithRedux };
