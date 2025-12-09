import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://18.185.130.103:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const articlesAPI = {
  getAll: () => apiClient.get('/api/articles'),
  getById: (id) => apiClient.get(`/api/articles/${id}`),
};

export default apiClient;