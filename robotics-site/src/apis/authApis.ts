import apiClient from './main';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  bio?: string;
}

export const login = async (data: LoginData) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
}

export const register = async (data: RegisterData) => {
  const response = await apiClient.post('/auth/register', data);
  console.log(response.data)
  return response.data;
}

export interface ProfileData {
  username?: string;
  email?: string;
  bio?: string;
  avatar?: File;
}

export interface PasswordData {
  currentPassword?: string; // Optional if backend doesn't require it for simple reset, but usually good practice
  newPassword?: string;
}

export const updateProfile = async (data: ProfileData) => {
  // If avatar is included, we might need FormData. 
  // For now assuming JSON or simple update if avatar logic is handled separately or not at all yet.
  // Let's assume standard JSON body for text fields.
  const response = await apiClient.patch('/auth/profile', data);
  return response.data;
}

export const changePassword = async (data: PasswordData) => {
  const response = await apiClient.post('/auth/change-password', data);
  return response.data;
}