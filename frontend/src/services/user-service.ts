import { api } from './api';
import {
  User,
  CreateUserDTO,
  UpdateUserDTO,
  PaginationQuery,
  PaginatedResponse,
  createUserSchema,
  updateUserSchema,
  paginatedResponseSchema,
  userSchema,
} from '../schemas/user.schema';

export type { User, CreateUserDTO, UpdateUserDTO, PaginationQuery, PaginatedResponse };

export const userService = {
  getAll: async (params?: PaginationQuery): Promise<PaginatedResponse> => {
    const response = await api.get('/users', { params });
    return paginatedResponseSchema.parse(response.data);
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return userSchema.parse(response.data);
  },

  create: async (userData: CreateUserDTO): Promise<User> => {
    const validatedData = createUserSchema.parse(userData);
    const response = await api.post('/users', validatedData);
    return userSchema.parse(response.data);
  },

  update: async (id: number, userData: UpdateUserDTO): Promise<User> => {
    const validatedData = updateUserSchema.parse(userData);
    const response = await api.patch(`/users/${id}`, validatedData);
    return userSchema.parse(response.data);
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
