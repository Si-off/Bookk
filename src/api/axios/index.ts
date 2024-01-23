import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const getAxiosInstance = (url: string) => {
  const endpoint = url;
  const instance: AxiosInstance = axios.create({ baseURL: BASE_URL, withCredentials: true });

  instance.defaults.paramsSerializer = (params) => {
    return qs.stringify(params);
  };

  const get = async (queries: object = {}) => {
    try {
      const res = await instance.get(endpoint, { params: queries } as AxiosRequestConfig);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  };

  const post = async (params: object = {}, config?: AxiosRequestConfig) => {
    try {
      const res = await instance.post(endpoint, params, config);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  };

  const patch = async (params: object = {}, config?: AxiosRequestConfig) => {
    try {
      const res = await instance.post(endpoint, params, config);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  };

  const remove = async (params: object = {}, config?: AxiosRequestConfig) => {
    try {
      const res = await instance.post(endpoint, params, config);

      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      console.error(error);
    }
  };

  return { get, post, patch, remove };
};

export default getAxiosInstance;
