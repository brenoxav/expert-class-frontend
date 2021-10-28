import axios from 'axios';
import getCSRFToken from './getCSRFToken';

const expertClassAPI = axios.create({
  baseURL: 'https://expert-class-backend.herokuapp.com',
  withCredentials: true,
  headers: {
    'X-CSRF-Token': getCSRFToken(),
  },
});

export default expertClassAPI;
