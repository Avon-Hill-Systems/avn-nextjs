// API Service for centralized API calls
import { config } from './config';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  linkedinUrl?: string | null;
  industry: string[];
  location: string[];
  remoteWork: string;
  role: string[];
  createdAt: string;
  updatedAt: string;
}

export interface StartupProfile {
  id: string;
  userId: string;
  companyName: string;
  description: string;
  companySize: string;
  industry: string[];
  location: string;
  remoteWork: string;
  website: string;
  linkedinUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeMetadata {
  id: string;
  userId: string;
  filename: string;
  contentType: string;
  size: number;
  uploadedAt: string;
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
  linkedinUrl?: string | null;
  industry: string[];
  location: string[];
  remoteWork: string;
  role: string[];
}

export interface UpdateStudentProfileRequest {
  major?: string;
  graduationYear?: number;
  technical?: boolean;
  linkedinUrl?: string | null;
  industry?: string[];
  location?: string[];
  remoteWork?: string;
  role?: string[];
}

export interface CreateStartupProfileRequest {
  companyName: string;
  description: string;
  companySize: string;
  industry: string[];
  location: string;
  remoteWork: string;
  website: string;
  linkedinUrl?: string | null;
}

export interface UpdateStartupProfileRequest {
  companyName?: string;
  description?: string;
  companySize?: string;
  industry?: string[];
  location?: string;
  remoteWork?: string;
  website?: string;
  linkedinUrl?: string | null;
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
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    }

    // Get session token from cookies
    // Do not attempt to read HttpOnly cookies client-side; rely on credentials: 'include'

    const headers = new Headers({
      'Content-Type': 'application/json',
      ...options.headers,
    });

    // Add Authorization header if we have a session token
    // Do not set Authorization from cookies; server validates session via cookies

    try {
      const response = await fetch(url, {
        headers,
        credentials: 'include', // Include cookies in the request
        ...options,
      });

      if (process.env.NODE_ENV === 'development') {
        console.log(`📡 API Response: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        const errorText = await response.text();
        if (process.env.NODE_ENV === 'development') {
          console.error(`❌ API Error ${response.status}:`, errorText);
        }
        
        return {
          error: `HTTP ${response.status}: ${response.statusText}`,
          message: errorText
        };
      }

      // Check if response has content before parsing JSON
      const contentType = response.headers.get('content-type');
      const contentLength = response.headers.get('content-length');
      
      if (contentLength === '0' || !contentType || !contentType.includes('application/json')) {
        if (process.env.NODE_ENV === 'development') {
          console.log('📡 Empty response or non-JSON content, returning success without data');
        }
        return { data: undefined };
      }

      const data = await response.json();
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ API Response received');
      }
      
      return { data };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ API Request failed:', error);
      }
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

  // Removed: current user via REST. Use Better Auth useSession() on the client.

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

  // Startup profile methods
  async createStartupProfile(userId: string, profileData: CreateStartupProfileRequest): Promise<ApiResponse<StartupProfile>> {
    return this.request<StartupProfile>(`/users/${userId}/startup-profile`, {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  async getStartupProfile(userId: string): Promise<ApiResponse<StartupProfile>> {
    return this.request<StartupProfile>(`/users/${userId}/startup-profile`);
  }

  async updateStartupProfile(userId: string, profileData: UpdateStartupProfileRequest): Promise<ApiResponse<StartupProfile>> {
    return this.request<StartupProfile>(`/users/${userId}/startup-profile`, {
      method: 'PATCH',
      body: JSON.stringify(profileData),
    });
  }

  async deleteStartupProfile(userId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/users/${userId}/startup-profile`, {
      method: 'DELETE',
    });
  }

  // Resume management methods
  async uploadResume(userId: string, file: File, description?: string): Promise<ApiResponse<ResumeMetadata>> {
    const formData = new FormData();
    formData.append('file', file);
    if (description) {
      formData.append('description', description);
    }

    return this.request<ResumeMetadata>(`/users/${userId}/resume`, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async getResume(userId: string): Promise<ApiResponse<ResumeMetadata>> {
    // For resume GET, we need to handle file responses, not JSON
    const url = `${this.baseURL}/users/${userId}/resume`;
    
    try {
      const response = await fetch(url, {
        headers: {},
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 404) {
          return { data: undefined }; // No resume exists
        }
        const errorText = await response.text();
        return {
          error: `HTTP ${response.status}: ${response.statusText}`,
          message: errorText
        };
      }

      // For resume GET, we expect file content, not JSON
      // We can extract metadata from response headers if available
      const contentType = response.headers.get('content-type');
      const contentDisposition = response.headers.get('content-disposition');
      const contentLength = response.headers.get('content-length');
      const xFileName = response.headers.get('x-file-name');
      const xFileCreatedAt = response.headers.get('x-file-created-at');
      const lastModified = response.headers.get('last-modified');
      
      // Extract filename from content-disposition header with better parsing
      let filename = 'resume';
      if (contentDisposition) {
        // Try different patterns for filename extraction
        let filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
        if (!filenameMatch) {
          filenameMatch = contentDisposition.match(/filename=([^;]+)/);
        }
        if (!filenameMatch) {
          filenameMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)/);
        }
        
        if (filenameMatch) {
          filename = decodeURIComponent(filenameMatch[1]);
        }
      }
      
      // Fallback to X-File-Name header if Content-Disposition parsing failed
      if (filename === 'resume' && xFileName) {
        filename = xFileName;
      }
      
      // If we still have a generic filename, try to infer from content type
      if (filename === 'resume') {
        if (contentType && contentType.includes('pdf')) {
          filename = 'resume.pdf';
        } else if (contentType && contentType.includes('doc')) {
          filename = 'resume.doc';
        } else if (contentType && contentType.includes('docx')) {
          filename = 'resume.docx';
        }
      }

      // Parse the creation date from headers
      let uploadedAt = new Date().toISOString();
      if (xFileCreatedAt) {
        try {
          uploadedAt = new Date(xFileCreatedAt).toISOString();
        } catch (err) {
          // Use current time if parsing fails
        }
      } else if (lastModified) {
        try {
          uploadedAt = new Date(lastModified).toISOString();
        } catch (err) {
          // Use current time if parsing fails
        }
      }

      // Create metadata from response headers
      const resumeMetadata: ResumeMetadata = {
        id: `temp-${Date.now()}`, // Temporary ID since we don't have one
        userId: userId,
        filename: filename,
        contentType: contentType || 'application/octet-stream',
        size: parseInt(contentLength || '0'),
        uploadedAt: uploadedAt
      };
      
      return { data: resumeMetadata };
      
    } catch (error) {
      return {
        error: 'Network error',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async deleteResume(userId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/users/${userId}/resume`, {
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
  // Student profile methods
  createStudentProfile: (userId: string, profileData: CreateStudentProfileRequest) => apiService.createStudentProfile(userId, profileData),
  getStudentProfile: (userId: string) => apiService.getStudentProfile(userId),
  updateStudentProfile: (userId: string, profileData: UpdateStudentProfileRequest) => apiService.updateStudentProfile(userId, profileData),
  deleteStudentProfile: (userId: string) => apiService.deleteStudentProfile(userId),
  // Startup profile methods
  createStartupProfile: (userId: string, profileData: CreateStartupProfileRequest) => apiService.createStartupProfile(userId, profileData),
  getStartupProfile: (userId: string) => apiService.getStartupProfile(userId),
  updateStartupProfile: (userId: string, profileData: UpdateStartupProfileRequest) => apiService.updateStartupProfile(userId, profileData),
  deleteStartupProfile: (userId: string) => apiService.deleteStartupProfile(userId),
  // Resume methods
  uploadResume: (userId: string, file: File, description?: string) => apiService.uploadResume(userId, file, description),
  getResume: (userId: string) => apiService.getResume(userId),
  deleteResume: (userId: string) => apiService.deleteResume(userId),
};

export const systemApi = {
  health: () => apiService.healthCheck(),
  status: () => apiService.getAppStatus(),
};

// -----------------------------
// React Query Hooks (cached)
// -----------------------------

// Query keys
const qk = {
  users: () => ["users"] as const,
  user: (id: string) => ["user", id] as const,
  currentUser: () => ["currentUser"] as const,
  studentProfile: (userId: string) => ["studentProfile", userId] as const,
  startupProfile: (userId: string) => ["startupProfile", userId] as const,
  resume: (userId: string) => ["resume", userId] as const,
  system: (key: string) => ["system", key] as const,
};

// Users
export function useUsersQuery() {
  return useQuery({
    queryKey: qk.users(),
    queryFn: async () => {
      const res = await userApi.getAll();
      if (res.error) throw new Error(res.message || res.error);
      return res.data ?? [];
    },
  });
}

export function useUserQuery(id: string, enabled = true) {
  return useQuery({
    queryKey: qk.user(id),
    enabled: Boolean(id) && enabled,
    queryFn: async () => {
      const res = await userApi.get(id);
      if (res.error) throw new Error(res.message || res.error);
      return res.data!;
    },
  });
}

// Removed: useCurrentUserQuery — use Better Auth useSession() instead

export function useUpdateUserMutation(id?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateUserRequest) => {
      if (!id) throw new Error("User id is required");
      const res = await userApi.update(id, data);
      if (res.error) throw new Error(res.message || res.error);
      return res.data!;
    },
    onSuccess: (data) => {
      if (id) queryClient.setQueryData(qk.user(id), data);
      queryClient.invalidateQueries({ queryKey: qk.users() });
      queryClient.invalidateQueries({ queryKey: qk.currentUser() });
    },
  });
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateUserRequest) => {
      const res = await userApi.create(data);
      if (res.error) throw new Error(res.message || res.error);
      return res.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qk.users() });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await userApi.delete(id);
      if (res.error) throw new Error(res.message || res.error);
      return res.data;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: qk.users() });
      queryClient.removeQueries({ queryKey: qk.user(id) });
    },
  });
}

// Student profile
export function useStudentProfileQuery(userId?: string, enabled = true) {
  return useQuery({
    queryKey: qk.studentProfile(userId || ""),
    enabled: Boolean(userId) && enabled,
    queryFn: async () => {
      const res = await userApi.getStudentProfile(userId!);
      if (res.error) {
        // Treat 404 as "no profile yet"
        if (res.error.includes('HTTP 404') || (res.message && res.message.toLowerCase().includes('not found'))) {
          return null;
        }
        throw new Error(res.message || res.error);
      }
      return res.data ?? null;
    },
  });
}

export function useUpsertStudentProfileMutation(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateStudentProfileRequest | UpdateStudentProfileRequest) => {
      if (!userId) throw new Error("userId is required");
      // decide create vs update based on presence in cache
      const existing = queryClient.getQueryData(qk.studentProfile(userId));
      const res = existing
        ? await userApi.updateStudentProfile(userId, data as UpdateStudentProfileRequest)
        : await userApi.createStudentProfile(userId, data as CreateStudentProfileRequest);
      if (res.error) throw new Error(res.message || res.error);
      return res.data!;
    },
    onSuccess: (data, _vars, _ctx) => {
      if (!userId) return;
      queryClient.setQueryData(qk.studentProfile(userId), data);
    },
  });
}

// Startup profile
export function useStartupProfileQuery(userId?: string, enabled = true) {
  return useQuery({
    queryKey: qk.startupProfile(userId || ""),
    enabled: Boolean(userId) && enabled,
    queryFn: async () => {
      const res = await userApi.getStartupProfile(userId!);
      if (res.error) {
        if (res.error.includes('HTTP 404') || (res.message && res.message.toLowerCase().includes('not found'))) {
          return null;
        }
        throw new Error(res.message || res.error);
      }
      return res.data ?? null;
    },
  });
}

export function useUpsertStartupProfileMutation(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateStartupProfileRequest | UpdateStartupProfileRequest) => {
      if (!userId) throw new Error("userId is required");
      const existing = queryClient.getQueryData(qk.startupProfile(userId));
      const res = existing
        ? await userApi.updateStartupProfile(userId, data as UpdateStartupProfileRequest)
        : await userApi.createStartupProfile(userId, data as CreateStartupProfileRequest);
      if (res.error) throw new Error(res.message || res.error);
      return res.data!;
    },
    onSuccess: (data) => {
      if (!userId) return;
      queryClient.setQueryData(qk.startupProfile(userId), data);
    },
  });
}

// Resume
export function useResumeQuery(userId?: string, enabled = true) {
  return useQuery({
    queryKey: qk.resume(userId || ""),
    enabled: Boolean(userId) && enabled,
    queryFn: async () => {
      const res = await userApi.getResume(userId!);
      if (res.error) {
        if (res.error.includes('HTTP 404') || (res.message && res.message.toLowerCase().includes('not found'))) {
          return null;
        }
        throw new Error(res.message || res.error);
      }
      return res.data ?? null; // allow null for "no resume"
    },
  });
}

export function useUploadResumeMutation(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { file: File; description?: string }) => {
      if (!userId) throw new Error("userId is required");
      const res = await userApi.uploadResume(userId, params.file, params.description);
      if (res.error) throw new Error(res.message || res.error);
      return res.data!;
    },
    onSuccess: (_data) => {
      if (!userId) return;
      queryClient.invalidateQueries({ queryKey: qk.resume(userId) });
    },
  });
}

export function useDeleteResumeMutation(userId?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("userId is required");
      const res = await userApi.deleteResume(userId);
      if (res.error) throw new Error(res.message || res.error);
      return res.data;
    },
    onSuccess: () => {
      if (!userId) return;
      queryClient.invalidateQueries({ queryKey: qk.resume(userId) });
    },
  });
}

// System
export function useHealthQuery() {
  return useQuery({
    queryKey: qk.system("health"),
    queryFn: async () => {
      const res = await systemApi.health();
      if (res.error) throw new Error(res.message || res.error);
      return res.data!;
    },
  });
}

export function useStatusQuery() {
  return useQuery({
    queryKey: qk.system("status"),
    queryFn: async () => {
      const res = await systemApi.status();
      if (res.error) throw new Error(res.message || res.error);
      return res.data!;
    },
  });
}
