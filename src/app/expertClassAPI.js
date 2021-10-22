import axios from 'axios';

const expertClassAPI = axios.create({
  baseURL: 'http://localhost:3001',
});

export default expertClassAPI;
