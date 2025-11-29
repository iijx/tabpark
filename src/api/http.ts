import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 10000, // Request timeout
    });

    // Request interceptor
    this.instance.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        // You can add headers or modify the request config here
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data; // Return only the data from the response
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  public get(url: string, params?: any): Promise<any> {
    return this.instance.get(url, { params }).then((res: any) => {
      console.log("resrrrr", res)
      return res;
    });
  }

  public post(url: string, data?: any): Promise<any> {
    return this.instance.post(url, data);
  }
}
