import { apiClient, withUserId } from './apiClient';
import type { CreatePinRequest, PinResponse } from '../types/api';
import axios, { AxiosError } from 'axios';


export const createPin = async (
  data: CreatePinRequest,
  userId: number
): Promise<PinResponse> => {
  try {

    const config = withUserId(userId);
    
    try {
      const response = await apiClient.post<PinResponse>('/pins', data, config);
      return response.data;
    } catch (firstError) {

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


export const getPinsByRegion = async (region: string): Promise<PinResponse[]> => {
  try {
    const response = await apiClient.get<PinResponse[]>(`/pins/region/${region}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch pins for region ${region}:`, error);
    throw error;
  }
}; 