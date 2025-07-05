import axios from 'axios';

export const fetchClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 180 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});
