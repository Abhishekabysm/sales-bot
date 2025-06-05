import axios from 'axios';
import { ENDPOINTS } from '../config/api';
import {
    AuthResponse,
    ChatMessage,
    ChatResponse,
    ChatSession,
    Product,
    ProductSearchParams,
    ProductSearchResponse,
    User
} from '../types';

// Create axios instance with default config
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Product API functions
export const productApi = {
  getAll: async (params?: ProductSearchParams): Promise<ProductSearchResponse> => {
    const response = await api.get(ENDPOINTS.PRODUCTS, { params });
    return response.data as ProductSearchResponse;
  },

  search: async (params: ProductSearchParams): Promise<ProductSearchResponse> => {
    const response = await api.get(ENDPOINTS.PRODUCT_SEARCH, { params });
    return response.data as ProductSearchResponse;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get(ENDPOINTS.PRODUCT_DETAIL(id));
    return response.data as Product;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get(ENDPOINTS.CATEGORIES);
    return (response.data as { categories: string[] }).categories;
  },

  getBrands: async (): Promise<string[]> => {
    const response = await api.get(ENDPOINTS.BRANDS);
    return (response.data as { brands: string[] }).brands;
  },
};

// Chat API functions
export const chatApi = {
  sendMessage: async (message: string, sessionId?: string): Promise<ChatResponse> => {
    const response = await api.post(ENDPOINTS.CHAT_MESSAGE, {
      message,
      session_id: sessionId,
    });
    return response.data as ChatResponse;
  },

  getHistory: async (sessionId: string): Promise<{ messages: ChatMessage[]; session_info: ChatSession }> => {
    const response = await api.get(ENDPOINTS.CHAT_HISTORY(sessionId));
    return response.data as { messages: ChatMessage[]; session_info: ChatSession };
  },

  getSessions: async (): Promise<ChatSession[]> => {
    const response = await api.get(ENDPOINTS.CHAT_SESSIONS);
    return (response.data as { sessions: ChatSession[] }).sessions;
  },

  resetSession: async (sessionId: string): Promise<{ message: string; session_id: string }> => {
    const response = await api.post(ENDPOINTS.CHAT_RESET(sessionId));
    return response.data as { message: string; session_id: string };
  },
};

// Auth API functions
export const authApi = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post(ENDPOINTS.AUTH_LOGIN, {
      username,
      password,
    });
    return response.data as AuthResponse;
  },

  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post(ENDPOINTS.AUTH_REGISTER, {
      username,
      email,
      password,
    });
    return response.data as AuthResponse;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get(ENDPOINTS.AUTH_PROFILE);
    return (response.data as { user: User }).user;
  },
};

export default api;
