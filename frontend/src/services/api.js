import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTrips = async () => {
  try {
    const response = await api.get('/trips');
    return response.data;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};

export const createTrip = async (tripData) => {
  try {
    const formData = new FormData();
    formData.append('userName', tripData.userName);
    formData.append('location', tripData.location);
    formData.append('description', tripData.description || '');
    formData.append('tripDate', tripData.tripDate);
    
    if (tripData.photo) {
      formData.append('photo', tripData.photo);
    }
    
    const response = await api.post('/trips', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};

