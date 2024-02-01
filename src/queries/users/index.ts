import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUser, getUserlist } from 'api/user';
import { QueryKeys } from 'constant';
import { useUserStore } from 'store/useUserStore';

const KEY = [QueryKeys.USER, 'userlist'];

export const useGetUserlist = () => {
  const { isLogin } = useUserStore.getState();

  return useQuery({
    queryKey: KEY,
    queryFn: getUserlist,
    enabled: !!isLogin,
    select: (users) =>
      users &&
      Object.keys(users)
        .filter((key) => key !== 'status')
        .map((key) => users[parseInt(key)]),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: KEY,
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(KEY);
    },
  });
};
