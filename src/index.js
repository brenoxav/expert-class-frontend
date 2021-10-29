import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import axios from 'axios';
import { Provider } from 'react-redux';
import App from './App';
import { setSessionCookies, checkLoginStatus } from './app/getCSRFToken';
import store from './app/store';

if (!checkLoginStatus()) {
  setSessionCookies();
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
