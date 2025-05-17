import { apiClient } from './apiClient';
import axios, { AxiosError } from 'axios';

/**
 * 이미지를 S3에 업로드합니다.
 * @param imageFile 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export const uploadImage = async (imageFile: File, userId: number = 6): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    // multipart/form-data로 전송하기 위한 설정
    const response = await apiClient.post('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'userId': userId.toString()
      },
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Image upload failed:', error);
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('Error response data:', axiosError.response.data);
        console.error('Error response status:', axiosError.response.status);
      }
    }
    
    throw error;
  }
}; 