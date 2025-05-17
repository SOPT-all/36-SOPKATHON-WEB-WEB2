import axios from 'axios';
import { ENV } from '../config/env';

// 기본 API 클라이언트 인스턴스
export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 에러 인터셉터 추가
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

// 사용자 ID 헤더 추가 함수
export const withUserId = (userId: number) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'userId': userId.toString(),
    },
  };
}; 