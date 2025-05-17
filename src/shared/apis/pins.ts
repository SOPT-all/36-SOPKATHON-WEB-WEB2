import { apiClient } from './apiClient';
import type { ApiResponse, PinDetailResponse, PinsListResponse } from '@/shared/types/api';

// 핀 상세 정보 조회
export const getPinDetail = async (pinId: string | number) => {
  try {
    const response = await apiClient.get<ApiResponse<PinDetailResponse>>(`/pins/detail/${pinId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 핀 목록 조회
export const getPinsList = async () => {
  try {
    const response = await apiClient.get<ApiResponse<PinsListResponse>>('/pins/list');
    return response.data;
  } catch (error) {
    throw error;
  }
}; 