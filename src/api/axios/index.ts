import { StorageKeys } from 'constant';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import qs from 'qs';
import secureLocalStorage from 'react-secure-storage';
import { useUserStore } from 'store/useUserStore';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const getAxiosInstance = (url: string) => {
  const endpoint = url;
  const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  let isRefreshing = false;

  instance.defaults.paramsSerializer = (params) => {
    return qs.stringify(params);
  };

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (!config.headers) return config;
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }

      // const { accessToken } = useUserStore();

      // if (accessToken) {
      //   config.headers['Authorization'] = `Bearer ${accessToken}`;
      // }
      return config;
    },
    (error: AxiosError) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  // instance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   async (error: AxiosError) => {
  //     const { config, response } = error;

  //     const originRequest = config;
  //     const { setAccessToken } = useUserStore();

  //     if (response?.status === 401) {
  //       if (!isRefreshing) {
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

  const get = async <T>(queries: object = {}) => {
    try {
      const res = await instance.get<T>(endpoint, {
        params: queries,
      } as AxiosRequestConfig);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  };

  const post = async <T>(params: object = {}, config?: AxiosRequestConfig) => {
    try {
      const res = await instance.post<T>(endpoint, params, config);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  };

  const patch = async <T>(params: object = {}, config?: AxiosRequestConfig) => {
    try {
      const res = await instance.patch<T>(endpoint, params, config);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async <T>(params: object = {}) => {
    try {
      const res = await instance.delete<T>(endpoint, params);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  };

  return { get, post, patch, remove };
};

export default getAxiosInstance;
