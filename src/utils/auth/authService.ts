import api from '@utils/api/apiConfig';
import axios from 'axios';

interface AuthResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export const login = async (
  username: string, 
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/Auth/login', {
      username,
      password
    });

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AuthenticationError(
          error.response.data.message || 'Credenciais inválidas'
        );
      }

      if (error.response?.status === 400) {
        throw new ApiError(
          error.response.data.message || 'Requisição inválida',
          400
        );
      }
      if (error.response?.status === 500) {
        throw new ApiError(
          'Erro interno do servidor',
          500
        );
      }

      throw new ApiError(
        error.response?.data?.message || 'Erro ao realizar login',
        error.response?.status
      );
    }

    throw new Error('Erro inesperado ao realizar login');
  }
};

export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (!storedRefreshToken) {
      throw new AuthenticationError('Refresh token não encontrado');
    }

    const response = await api.post<AuthResponse>('/Auth/refresh', {
      refreshToken: storedRefreshToken
    });

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AuthenticationError('Sessão expirada');
      }
      throw new ApiError(
        error.response?.data?.message || 'Erro ao atualizar token',
        error.response?.status
      );
    }
    throw new Error('Erro inesperado ao atualizar token');
  }
};