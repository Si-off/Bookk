import { LoginResponse, SignUpRes, SignUpReq, LoginParams } from 'types';
import Axios from '../axios';

export const login = async (user: LoginParams) => {
  const auth = btoa(`${user.email}:${user.password}`);
  const res = await Axios('/auth/login/email').post<LoginResponse>(
    {},
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return res;
};

export const signUp = async (params: SignUpReq) => {
  const res = await Axios('/auth/register/email').post<SignUpRes>({ ...params });

  return res;
};

export const logout = async () => {};
