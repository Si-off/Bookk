import { getAxiosInstance as Axios } from 'api/axios';
import { UserType } from 'types';

type Response = {
  [key: number]: UserType;
  status: number;
};

// 유저 목록
export const getUserlist = async () => {
  const res = await Axios(`/users`).get<Response>();

  return res;
};

export const deleteUser = async (id: number | string) => {
  const res = await Axios(`/users/delete/${id}`).get<Response>();

  return res;
};
