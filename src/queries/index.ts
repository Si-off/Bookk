import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBooks, postBooks, patchBook, deleteBook, getBook, getNextBooks } from 'api';
import { BooklistParams, BooklistRes } from 'types';
import queryKeys from './queryKeys';
import { login, getUser } from 'api/auth';
import CustomAxiosInstance from 'api/axios';
import { StorageKeys } from 'constant';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';

export const useGetBooks = (queries: BooklistParams) => {
  const queryClient = useQueryClient();
  const key = [queryKeys.USER, 'books'];
  if (queries) key.push(queries.page.toString());

  console.log('queries', queries);

  return useQuery({
    queryKey: key,
    queryFn: () => getBooks(queries),
    onSuccess: async (res: BooklistRes) => {
      if (!queries) return;
      const totalPages = Math.ceil(res.total / queries.take);
      if (totalPages < queries.page + 1) return;

      // await queryClient.prefetchQuery({
      //   queryKey: [queryKeys.USER, 'books', (queries.page + 1).toString()],
      //   queryFn: () => getBooks({ ...queries, page: queries.page + 1 }),
      //   staleTime: 1000 * 60 * 3,
      //   cacheTime: 1000 * 60 * 5,
      // });
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 5,
  });
};

export const useGetBooksAdmin = (queries: BooklistParams) => {
  const queryClient = useQueryClient();
  const key = [queryKeys.ADMIN, 'books'];
  if (queries) key.push(queries.page.toString());

  return useQuery({
    queryKey: key,
    queryFn: () => getBooks(queries),
    onSuccess: async (res: BooklistRes) => {
      if (!queries) return;
      if (res.total < queries.take * queries.page) return;
    },
  });
};

export const useGetBook = (id: number) => {
  const queryClient = useQueryClient();
  const key = [queryKeys.ADMIN, 'books', id.toString()];
  return useQuery({
    queryKey: key,
    queryFn: () => getBook(id),
    select: (res) => res,
  });
};

export const usePostBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.ADMIN, 'books'],
    mutationFn: postBooks,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.ADMIN, 'books']);
      queryClient.invalidateQueries([queryKeys.USER, 'books']);
    },
  });
};

export const usePatchBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.ADMIN, 'books'],
    mutationFn: patchBook,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.ADMIN, 'books']);
      queryClient.invalidateQueries([queryKeys.USER, 'books']);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.ADMIN, 'books'],
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.ADMIN, 'books']);
      queryClient.invalidateQueries([queryKeys.USER, 'books']);
    },
  });
};

export const useLogin = () => {
  const { getState } = useUserStore;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [queryKeys.USER],
    mutationFn: login,
    onSuccess: (data) => {
      if (!data) return;
      getState().setIsLogin(true);
      queryClient.setQueryData([queryKeys.USER], data.userInfo);
      CustomAxiosInstance.setAccessToken(data.accessToken);
      secureLocalStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refreshToken);
      navigate('/user');
    },
  });
};

export const useGetUser = (token: string) => {
  const { getState } = useUserStore;

  return useQuery({
    queryKey: [queryKeys.USER],
    queryFn: getUser,
    enabled: !!token,
    onSuccess: () => {
      getState().setIsLogin(true);
    },
  });
};
