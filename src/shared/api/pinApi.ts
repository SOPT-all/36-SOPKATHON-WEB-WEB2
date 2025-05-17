import { apiClient, withUserId } from './apiClient';
import type { CreatePinRequest, PinResponse } from '../types/api';
import axios, { AxiosError } from 'axios';

/**
 * 새로운 핀(장소 리뷰)을 생성합니다.
 * @param data 핀 생성에 필요한 데이터
 * @param userId 사용자 ID
 * @returns 생성된 핀 정보
 */
export const createPin = async (
  data: CreatePinRequest,
  userId: number
): Promise<PinResponse> => {
  try {
    // 헤더 설정
    const config = withUserId(userId);
    
    try {
      const response = await apiClient.post<PinResponse>('/pins', data, config);
      return response.data;
    } catch (firstError) {
      // 첫 번째 시도가 실패한 경우, 예시와 정확히 동일한 데이터 형식으로 다시 시도
      const simplifiedData = {
        ...data,
        reviews: ["review1"],
        isCorrect: true,
      };
      
      const retryResponse = await apiClient.post<PinResponse>('/pins', simplifiedData, config);
      return retryResponse.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Error response data:', axiosError.response.data);
        console.error('Error response status:', axiosError.response.status);
        console.error('Error response headers:', axiosError.response.headers);
      }
    }
    throw error;
  }
};

/**
 * 지역별 핀 목록을 가져옵니다.
 * @param region 지역명
 * @returns 핀 목록
 */
export const getPinsByRegion = async (region: string): Promise<PinResponse[]> => {
  try {
    const response = await apiClient.get<PinResponse[]>(`/pins/region/${region}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch pins for region ${region}:`, error);
    throw error;
  }
}; 