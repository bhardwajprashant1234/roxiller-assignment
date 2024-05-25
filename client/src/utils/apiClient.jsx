import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this with your backend API URL
});

export default apiClient;