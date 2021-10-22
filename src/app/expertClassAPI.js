import axios from 'axios';
import getCSRFToken from './getCSRFToken';

const expertClassAPI = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
  headers: {
    'X-CSRF-Token': getCSRFToken(),
  },
});

export default expertClassAPI;
