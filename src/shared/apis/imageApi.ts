import { apiClient } from './apiClient';
import axios, { AxiosError } from 'axios';


export const uploadImage = async (imageFile: File, userId: number = 6): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

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