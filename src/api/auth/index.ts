import { StorageKeys } from 'constant';
import Axios from '../axios';
import secureLocalStorage from 'react-secure-storage';
import { useUserStore } from 'store/useUserStore';
import { LoginResponse, SignUpRes, SignUpReq, LoginParams } from 'types';

export const login = async (user: LoginParams) => {
  const auth = btoa(`${user.email}:${user.password}`);

  const res = await Axios('/auth/login/email').post<LoginResponse>(
    {},
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return res;
};

export const signUp = async (params: SignUpReq) => {
  const res = await Axios('/auth/register/email').post<SignUpRes>({
    ...params,
  });

  return res;
};

export const logout = () => {
  const { getState } = useUserStore;
  secureLocalStorage.removeItem('refreshToken');
  getState().setIsLogin(false);
  window.location.replace('/');
};

export const getUser = async () => {
  const res = await Axios('/users/me').get<LoginResponse>();

  return res;
};

export const getAccessToken = async () => {
  const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN);
  const res = await Axios('/auth/token/access').post<{ accessToken: string }>(
    {},
    { headers: { Authorization: `Bearer ${refreshToken}` } }
  );
  return res?.accessToken;
};
