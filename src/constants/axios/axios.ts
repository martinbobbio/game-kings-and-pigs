import axios from 'axios';

export const API = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/api',
});
