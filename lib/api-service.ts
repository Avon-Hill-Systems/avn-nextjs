// API Service for centralized API calls
import { config } from './config';

const API_BASE_URL = config.api.baseUrl;

// Types for API responses
export interface User {
  id: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  company?: string | null;
  is_student: boolean;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  first_name: string;
  last_name: string;
  company?: string | null;
  is_student: boolean;
}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  company?: string | null;
  is_student?: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Generic API client with error handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    if (options.body) {
      console.log('📦 Request body:', options.body);
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      console.log(`📡 API Response: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error ${response.status}:`, errorText);
        
        return {
          error: `HTTP ${response.status}: ${response.statusText}`,
          message: errorText
        };
      }

      const data = await response.json();
      console.log('✅ API Response data:', data);
      
      return { data };
    } catch (error) {
      console.error('❌ API Request failed:', error);
      return {
        error: 'Network error',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // User management methods
  async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.request<User>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`);
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/users');
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>('/health');
  }

  // Application status
  async getAppStatus(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>('/');
  }
}

// Create and export the API client instance
export const apiService = new ApiClient(API_BASE_URL);

// Convenience functions for common operations
export const userApi = {
  create: (userData: CreateUserRequest) => apiService.createUser(userData),
  get: (id: string) => apiService.getUser(id),
  update: (id: string, userData: UpdateUserRequest) => apiService.updateUser(id, userData),
  delete: (id: string) => apiService.deleteUser(id),
  getAll: () => apiService.getAllUsers(),
};

export const systemApi = {
  health: () => apiService.healthCheck(),
  status: () => apiService.getAppStatus(),
};
