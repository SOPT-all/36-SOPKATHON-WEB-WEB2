import axios from 'axios';

// 실제 API URL로 바꾸기
const BASE_URL = 'https://web3.com';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
