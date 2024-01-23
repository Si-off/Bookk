import Axios from "../axios";

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
  try {
    const res = await Axios("/auth/login/email").post(
      {},
      { headers: { Authorization: `Basic ${auth}` } }
    );
    if (!res.ok) {
      throw new Error("로그인에 실패했습니다.");
    }
    return res;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const signUp = async (params: SignUp) => {
  const res = await Axios("/auth/register/email").post({ ...params });

  return res;
};

export const logout = async () => {};
