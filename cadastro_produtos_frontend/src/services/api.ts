import axios, { type AxiosRequestConfig } from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
}

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
    this.name = 'ApiError';
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function normalizeAxiosError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error;
    const status = axiosError.response?.status ?? 0;
    const responseData = axiosError.response?.data;

    if (typeof responseData === 'string' && responseData.trim()) {
      return new ApiError(status, responseData, responseData);
    }

    const apiResponse = responseData as Partial<ApiResponse<unknown>> | undefined;
    const fallbackMessage =
      status === 0
        ? 'Erro de conexao. Verifique se o backend esta rodando.'
        : 'Erro ao fazer requisicao para a API.';

    return new ApiError(
      status,
      apiResponse?.error || axiosError.message || fallbackMessage,
      responseData
    );
  }

  return new ApiError(500, 'Erro desconhecido', error);
}

export async function apiCall<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await api.request<T>({
      url: endpoint,
      ...config,
    });

    return response.data;
  } catch (error) {
    throw normalizeAxiosError(error);
  }
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: 'GET' });
}

export async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
  return apiCall<T>(endpoint, {
    method: 'POST',
    data,
  });
}

export async function apiPut<T>(endpoint: string, data: unknown): Promise<T> {
  return apiCall<T>(endpoint, {
    method: 'PUT',
    data,
  });
}

export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiCall<T>(endpoint, { method: 'DELETE' });
}

export default api;
