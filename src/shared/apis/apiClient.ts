import axios from 'axios';

const BASE_URL = 'https://13.124.240.84.nip.io';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
