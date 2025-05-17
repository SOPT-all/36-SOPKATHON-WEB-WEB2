import { apiClient } from '../apiClient';

export const fetchRegionPins = async () => {
  try {
    const response = await apiClient.get('/pins/regions');
    return response.data;
  } catch (error) {
    console.error('Error fetching region pins:', error);
    throw error;
  }
};
