import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição para adicionar o token JWT ao cabeçalho
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Supondo que o token JWT está armazenado no localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta para capturar e tratar erros
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
