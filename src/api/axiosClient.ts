import axios, { AxiosError } from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен в заголовки для каждого запроса
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Обработка ошибок
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Если токен невалидный, удаляем его
      localStorage.removeItem('auth_token');
      // Можно перенаправить на страницу логина
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    if (error.response) {
      // Сервер вернул ошибку
      const message = (error.response.data as { message?: string })?.message || error.message;
      console.error('API Error:', message);
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Запрос был отправлен, но ответа не получено
      console.error('Network Error:', error.message);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Ошибка при настройке запроса
      console.error('Request Error:', error.message);
      return Promise.reject(error);
    }
  }
);

