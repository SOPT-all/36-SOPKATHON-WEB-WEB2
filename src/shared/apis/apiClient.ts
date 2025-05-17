import axios from 'axios';

// 실제 API URL로 바꾸기
const BASE_URL = 'https://13.124.240.84.nip.io';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
