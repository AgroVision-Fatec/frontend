import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.101.78:3000',
});



api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('Token');
  if (token) {
    config.headers.Authorization = `Bearer ${token} `;
  }
  return config;
});

export default api;