export interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  userType: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
}
