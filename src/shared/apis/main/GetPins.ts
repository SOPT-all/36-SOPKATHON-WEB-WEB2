import { apiClient } from '../apiClient';

export const GetPins = async () => {
  try {
    const response = await apiClient.get('/pins');
    return response.data;
  } catch (error) {
    console.error('Error fetching region pins:', error);
    throw error;
  }
};
