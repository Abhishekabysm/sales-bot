// Types for the e-commerce chatbot application

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock_quantity: number;
  image_url?: string;
  rating: number;
  features?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ChatMessage {
  id: number;
  session_id: number;
  message: string;
  response: string;
  message_type: string;
  timestamp: string;
}

export interface ChatSession {
  id: number;
  user_id?: number;
  session_id: string;
  created_at: string;
  updated_at: string;
  message_count: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface ChatResponse {
  response: string;
  type: string;
  products?: Product[];
  session_id: string;
  message_id: number;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  user: User;
}

export interface ProductSearchParams {
  q?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  brand?: string;
  page?: number;
  per_page?: number;
}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
  pages: number;
  current_page: number;
  per_page: number;
  query?: string;
}

export interface ApiError {
  error: string;
}
