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

export interface StudentProfile {
  id: string;
  userId: string;
  major: string;
  graduationYear: number;
  technical: boolean;
  industry: string[];
  location: string[];
  remoteWork: string;
  role: string[];
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

export interface CreateStudentProfileRequest {
  major: string;
  graduationYear: number;
  technical: boolean;
  industry: string[];
  location: string[];
  remoteWork: string;
  role: string[];
}

export interface UpdateStudentProfileRequest {
  major?: string;
  graduationYear?: number;
  technical?: boolean;
  industry?: string[];
  location?: string[];
  remoteWork?: string;
  role?: string[];
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
    console.log('📍 API Request Stack Trace:', new Error().stack?.split('\n').slice(1, 5));
    if (options.body) {
      console.log('📦 Request body:', options.body);
    }

    // Get session token from cookies
    const sessionToken = typeof document !== 'undefined' 
      ? document.cookie
          .split('; ')
          .find(row => row.startsWith('better-auth.session_token='))
          ?.split('=')[1]
      : null;

    console.log('🔑 Session token for API request:', sessionToken ? `${sessionToken.substring(0, 20)}...` : 'Not found');

    const headers = new Headers({
      'Content-Type': 'application/json',
      ...options.headers,
    });

    // Add Authorization header if we have a session token
    if (sessionToken) {
      headers.set('Authorization', `Bearer ${sessionToken}`);
    }

    try {
      const response = await fetch(url, {
        headers,
        credentials: 'include', // Include cookies in the request
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

      // Check if response has content before parsing JSON
      const contentType = response.headers.get('content-type');
      const contentLength = response.headers.get('content-length');
      
      if (contentLength === '0' || !contentType || !contentType.includes('application/json')) {
        console.log('📡 Empty response or non-JSON content, returning success without data');
        return { data: undefined };
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

  // Get current user profile
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/me');
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>('/health');
  }

  // Application status
  async getAppStatus(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>('/');
  }

  // Student profile methods (now includes preferences)
  async createStudentProfile(userId: string, profileData: CreateStudentProfileRequest): Promise<ApiResponse<StudentProfile>> {
    return this.request<StudentProfile>(`/users/${userId}/student-profile`, {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  async getStudentProfile(userId: string): Promise<ApiResponse<StudentProfile>> {
    return this.request<StudentProfile>(`/users/${userId}/student-profile`);
  }

  async updateStudentProfile(userId: string, profileData: UpdateStudentProfileRequest): Promise<ApiResponse<StudentProfile>> {
    return this.request<StudentProfile>(`/users/${userId}/student-profile`, {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    });
  }

  async deleteStudentProfile(userId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/users/${userId}/student-profile`, {
      method: 'DELETE',
    });
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
  getCurrentUser: () => apiService.getCurrentUser(),
  // Student profile methods
  createStudentProfile: (userId: string, profileData: CreateStudentProfileRequest) => apiService.createStudentProfile(userId, profileData),
  getStudentProfile: (userId: string) => apiService.getStudentProfile(userId),
  updateStudentProfile: (userId: string, profileData: UpdateStudentProfileRequest) => apiService.updateStudentProfile(userId, profileData),
  deleteStudentProfile: (userId: string) => apiService.deleteStudentProfile(userId),
};

export const systemApi = {
  health: () => apiService.healthCheck(),
  status: () => apiService.getAppStatus(),
};
