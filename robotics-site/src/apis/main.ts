//We gonna implement API calls here
import axios from 'axios';

const apiClient = axios.create({
  baseURL:'https://robotics-club-backend-service.onrender.com/api',
  headers:{
    'Content-Type':'application/json',
  },
});

export default apiClient;