import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.4:3000',

  /// ESSE BASE URL É FUNCIONAL PRA QUEM TA USANDO O EXPO PELO CELULAR, PELO EMULADOR DO ANDROID ESTUDIO DEVE SER OUTRO, N TENHO CRTZ, MAS A PORTA É A MESMA!
});

export default api;
