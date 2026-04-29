import axios from 'axios';

// For Codespaces: Use the public forwarded URL
// Extract from current URL and construct the backend URL
const getBackendURL = () => {
  if (typeof window !== 'undefined' && window.location.hostname.includes('app.github.dev')) {
    // Running in Codespaces - extract subdomain and construct backend URL
    const hostname = window.location.hostname;
    // Replace 5173 with 5000 in the domain
    const backendHostname = hostname.replace('-5173.', '-5000.');
    return `https://${backendHostname}/api`;
  }
  // Fallback for local development
  return '/api';
};

const API_BASE_URL = getBackendURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Task endpoints
export const tasksAPI = {
  getAll: () => api.get('/tasks'),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
  toggleComplete: (id) => api.put(`/tasks/${id}/toggle`),
};

export default api;
