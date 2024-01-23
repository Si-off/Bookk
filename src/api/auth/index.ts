import Axios from '../axios';

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
    { headers: { Authorization: `Basic ${auth}` } }
  );

  return res;
};

export const signUp = async (params: SignUp) => {
  const res = await Axios('/auth/register/email').post({ ...params });

  return res;
};
