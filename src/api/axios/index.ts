import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";

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
          config.headers["Content-Type"] = "multipart/form-data";
        } else {
          config.headers["Content-Type"] = "application/json";
        }

        if (config.headers.Authorization) return config;

        if (this.accessToken) {
          config.headers["Authorization"] = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        console.error(error);
        return Promise.reject(error);
      }
    );

    // this.instance.interceptors.response.use(
    //   (response) => {
    //     return response;
    //   },
    //   async (error: AxiosError) => {
    //     const { config, response } = error;

    //     const originRequest = config;

    //     if (response?.status === 401) {
    //       if (!this.isRefreshing) {
    //         isRefreshing = true;
    //         try {
    //           const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN);
    //           const { data } = await axios.post('/auth/token/access', refreshToken);

    //           const newAccessToken = data.accessToken;
    //           console.log(newAccessToken);
    //           setAccessToken(newAccessToken);
    //           isRefreshing = true;
    //           return originRequest;
    //         } catch (refreshError) {
    //           console.error(refreshError);
    //           isRefreshing = false;
    //           secureLocalStorage.removeItem(StorageKeys.REFRESH_TOKEN);
    //           window.location.replace('/login');
    //           return Promise.reject(refreshError);
    //         }
    //       }
    //     }

    //     return Promise.reject(error);
    //   }
    // );
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
      const res = await CustomAxiosInstance.instance.post<T>(
        this.endpoint,
        params,
        config
      );

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  }
  async patch<T>(params: object = {}, config?: AxiosRequestConfig) {
    try {
      const res = await CustomAxiosInstance.instance.patch<T>(
        this.endpoint,
        params,
        config
      );

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  }
  async delete<T>(params: object = {}) {
    try {
      const res = await CustomAxiosInstance.instance.delete<T>(
        this.endpoint,
        params
      );

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  }
}

export default CustomAxiosInstance;
