import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.57.201:3000',
});

api.interceptors.request.use(config => {
  const token = AsyncStorage.getItem('Token');
  if (token) {
    config.headers.Authorization = `Bearer ${token} `;
  }
  return config;
});

export default api;