import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { StorageKeys } from 'constant';
import qs from 'qs';
import secureLocalStorage from 'react-secure-storage';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

class CustomAxiosInstance {
  private static readonly instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });
  private static accessToken: string | null = null;
  private readonly endpoint: string;

  constructor(url: string) {
    this.endpoint = url;
  }

  static init() {
    this.instance.defaults.paramsSerializer = (params) => {
      return qs.stringify(params);
    };

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (config.data instanceof FormData) {
          config.headers['Content-Type'] = 'multipart/form-data';
        } else {
          config.headers['Content-Type'] = 'application/json';
        }

        if (config.headers.Authorization) return config;

        if (this.accessToken) {
          config.headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        console.error(error);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const { config, response } = error;
        let isRefreshing = false;

        if (response?.status === 401 || response?.status === 404) {
          if (!isRefreshing) {
            isRefreshing = true;
            const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN);
            try {
              const { data } = await axios.post(
                `${BASE_URL}/auth/token/access`,
                {},
                { headers: { Authorization: `Bearer ${refreshToken}` } }
              );
              const newAccessToken = data.accessToken;
              this.setAccessToken(newAccessToken);

              config!.headers['Authorization'] = `Bearer ${this.accessToken}`;
              isRefreshing = true;
              return this.instance.request(config);
            } catch (refreshError) {
              console.error(refreshError);
              isRefreshing = false;
              alert('다시 로그인 해주세요.');
              secureLocalStorage.removeItem(StorageKeys.REFRESH_TOKEN);
              window.location.replace('/user');
              return Promise.reject(refreshError);
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }

  static setAccessToken(token: string) {
    this.accessToken = token;
  }

  async get<T>(queries: object = {}) {
    try {
      const res = await CustomAxiosInstance.instance.get<T>(this.endpoint, {
        params: queries,
      } as AxiosRequestConfig);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  }
  async post<T>(params: object = {}, config?: AxiosRequestConfig) {
    try {
      const res = await CustomAxiosInstance.instance.post<T>(this.endpoint, params, config);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  }
  async patch<T>(params: object = {}, config?: AxiosRequestConfig) {
    try {
      const res = await CustomAxiosInstance.instance.patch<T>(this.endpoint, params, config);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  }
  async delete<T>(params: object = {}) {
    try {
      const res = await CustomAxiosInstance.instance.delete<T>(this.endpoint, params);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  }
}

export default CustomAxiosInstance;
