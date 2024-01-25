import Axios from '../axios';
import secureLocalStorage from 'react-secure-storage';
import { useUserStore } from 'store/useUserStore';
import { LoginResponse, SignUpRes, SignUpReq, LoginParams } from 'types';

export const login = async (user: LoginParams) => {
  const auth = btoa(`${user.email}:${user.password}`);

  const res = await new Axios('/auth/login/email').post<LoginResponse>(
    {},
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return res;
};

export const signUp = async (params: SignUpReq) => {
  const res = await new Axios('/auth/register/email').post<SignUpRes>({ ...params });

  return res;
};

export const logout = async () => {
  secureLocalStorage.removeItem('refreshToken');
  useUserStore.setState({ accessToken: null, user: null });
};

export const getUser = async () => {
  const res = await new Axios('/users/me').get<LoginResponse>();

  return res;
};
