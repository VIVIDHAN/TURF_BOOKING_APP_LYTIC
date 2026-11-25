import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse } from '@turf/shared-types';

export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  getToken?: () => Promise<string | null> | string | null;
  onUnauthorized?: () => void;
}

export class TurfApiClient {
  private client: AxiosInstance;
  private getToken?: () => Promise<string | null> | string | null;
  private onUnauthorized?: () => void;

  constructor(config: ApiClientConfig) {
    this.getToken = config.getToken;
    this.onUnauthorized = config.onUnauthorized;

    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      async (config) => {
        if (this.getToken) {
          const token = await this.getToken();
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ApiResponse<never>>) => {
        if (error.response?.status === 401 && this.onUnauthorized) {
          this.onUnauthorized();
        }
        return Promise.reject(error);
      },
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.get<ApiResponse<T>>(url, config);
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.post<ApiResponse<T>>(url, data, config);
  }

  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.put<ApiResponse<T>>(url, data, config);
  }

  public patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.patch<ApiResponse<T>>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.delete<ApiResponse<T>>(url, config);
  }
}

export const createApiClient = (config: ApiClientConfig): TurfApiClient => {
  return new TurfApiClient(config);
};
