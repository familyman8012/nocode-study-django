import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from '@/lib/axios';
import { PaginatedResponse } from '@/interfaces/api';

export class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig) => {
    const response = await axiosInstance.get<PaginatedResponse<T>>(this.endpoint, config);
    return response.data;
  };

  get = async (id: number) => {
    const response = await axiosInstance.get<T>(`${this.endpoint}${id}/`);
    return response.data;
  };

  create = async (data: unknown) => {
    const response = await axiosInstance.post<T>(this.endpoint, data);
    return response.data;
  };

  update = async (id: number, data: unknown) => {
    const response = await axiosInstance.put<T>(`${this.endpoint}${id}/`, data);
    return response.data;
  };

  patch = async (id: number, data: unknown) => {
    const response = await axiosInstance.patch<T>(`${this.endpoint}${id}/`, data);
    return response.data;
  };

  delete = async (id: number) => {
    await axiosInstance.delete(`${this.endpoint}${id}/`);
  };
}
