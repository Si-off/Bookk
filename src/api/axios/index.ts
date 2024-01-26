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
  private static refreshToken: string | null = secureLocalStorage.getItem(
    StorageKeys.REFRESH_TOKEN
  ) as string;
  private readonly endpoint: string;

  constructor(url: string) {
    this.endpoint = url;
  }

  private static async getAccessToken(token: string): Promise<{ accessToken: 'accessToken' }> {
    const { data } = await axios.post(
      `${BASE_URL}/auth/token/access`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }

  public static setAccessToken(token: string) {
    this.accessToken = token;
  }

  // TODO : 에러 핸들링
  public static async init() {
    this.instance.defaults.paramsSerializer = (params) => {
      return qs.stringify(params);
    };

    if (this.refreshToken) {
      const data = await this.getAccessToken(this.refreshToken);
      this.accessToken = data.accessToken;
    }

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
            try {
              if (!this.refreshToken) {
                return Promise.reject(error);
              }
              const data = await this.getAccessToken(this.refreshToken);
              const newAccessToken = data.accessToken;
              this.setAccessToken(newAccessToken);

              config!.headers['Authorization'] = `Bearer ${this.accessToken}`;
              isRefreshing = true;
              return this.instance.request(config);
            } catch (refreshError) {
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

  public async get<T>(queries: object = {}) {
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
  public async post<T>(params: object = {}, config?: AxiosRequestConfig) {
    try {
      const res = await CustomAxiosInstance.instance.post<T>(this.endpoint, params, config);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  }
  public async patch<T>(params: object = {}, config?: AxiosRequestConfig) {
    try {
      const res = await CustomAxiosInstance.instance.patch<T>(this.endpoint, params, config);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  }
  public async delete<T>(params: object = {}) {
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
