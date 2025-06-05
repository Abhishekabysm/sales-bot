// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');

// API endpoints
export const ENDPOINTS = {
  // Products
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCT_SEARCH: `${API_BASE_URL}/api/products/search`,
  PRODUCT_DETAIL: (id: number) => `${API_BASE_URL}/api/products/${id}`,
  CATEGORIES: `${API_BASE_URL}/api/products/categories`,
  BRANDS: `${API_BASE_URL}/api/products/brands`,
  
  // Chat
  CHAT_MESSAGE: `${API_BASE_URL}/api/chat/message`,
  CHAT_HISTORY: (sessionId: string) => `${API_BASE_URL}/api/chat/history/${sessionId}`,
  CHAT_SESSIONS: `${API_BASE_URL}/api/chat/sessions`,
  CHAT_RESET: (sessionId: string) => `${API_BASE_URL}/api/chat/reset/${sessionId}`,
  
  // Auth
  AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_PROFILE: `${API_BASE_URL}/auth/profile`,
};

export default API_BASE_URL;
