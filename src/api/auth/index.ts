import Axios from '../axios';
import secureLocalStorage from 'react-secure-storage';
import { useUserStore } from 'store/useUserStore';

interface User {
  email: string;
  password: string;
}

interface SignUp {
  nickname: string;
  name: string;
  password: string;
  email: string;
}

export const login = async (user: User) => {
  const auth = btoa(`${user.email}:${user.password}`);

  const res = await Axios('/auth/login/email').post(
    {},
    { headers: { Authorization: `Basic ${auth}` } },
  );
  // if (!res.ok) {
  //   throw new Error('로그인에 실패했습니다.');
  // }
  return res;
};

export const signUp = async (params: SignUp) => {
  const res = await Axios('/auth/register/email').post({ ...params });

  return res;
};

export const logout = async () => {
  secureLocalStorage.removeItem('refreshToken');
  useUserStore.setState({ accessToken: null, user: null });
};
