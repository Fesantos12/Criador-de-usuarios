import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3443/',
});

export default api;
