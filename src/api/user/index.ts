import { getAxiosInstance as Axios } from 'api/axios';

// 유저 목록
export const getUsers = async () => {
  const res = await Axios(`/users`).get();
  console.log(res);
  return res;
};
