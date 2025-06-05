// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API endpoints
export const ENDPOINTS = {
  // Products
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_SEARCH: `${API_BASE_URL}/products/search`,
  PRODUCT_DETAIL: (id: number) => `${API_BASE_URL}/products/${id}`,
  CATEGORIES: `${API_BASE_URL}/products/categories`,
  BRANDS: `${API_BASE_URL}/products/brands`,
  
  // Chat
  CHAT_MESSAGE: `${API_BASE_URL}/chat/message`,
  CHAT_HISTORY: (sessionId: string) => `${API_BASE_URL}/chat/history/${sessionId}`,
  CHAT_SESSIONS: `${API_BASE_URL}/chat/sessions`,
  CHAT_RESET: (sessionId: string) => `${API_BASE_URL}/chat/reset/${sessionId}`,
  
  // Auth
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_PROFILE: `${API_BASE_URL}/auth/profile`,
};

export default API_BASE_URL;
