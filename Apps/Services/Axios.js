import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.0.2:3000',
});

api.interceptors.request.use(async config => {
  console.log('batendo request')
  const token = await AsyncStorage.getItem('Token');
  console.log('token: + '+token)
  if (token) {
    config.headers.Authorization = `Bearer ${token} `;
  }
  return config;
});

export default api;