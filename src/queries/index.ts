import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  getBooks,
  postBooks,
  patchBook,
  deleteBook,
  getBook,
  postComment,
  patchComment,
  deleteComment,
  getComments,
  getBooksLike,
  postBookLike,
  deleteBookLike,
  getBookIsLike,
} from 'api';
import { BooklistParams } from 'types';
import { QueryKeys, StorageKeys } from 'constant';
import { getUser, login } from 'api/auth';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';

export const useGetBooks = (queries?: BooklistParams) => {
  const key = [QueryKeys.USER, 'books'];
  if (queries?.page) key.push(queries.page.toString());

  return useQuery({
    queryKey: key,
    queryFn: () => getBooks(queries),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 5,
  });
};

export const useGetBooksAdmin = (queries: BooklistParams) => {
  const key = [QueryKeys.ADMIN, 'books'];

  if (queries?.page) key.push(queries.page.toString());

  return useQuery({
    queryKey: key,
    queryFn: () => getBooks(queries),
  });
};

export const useGetBook = (id: number) => {
  const key = [QueryKeys.ADMIN, 'books', id.toString()];

  return useQuery({
    queryKey: key,
    queryFn: () => getBook(id),
    select: (res) => res,
  });
};

export const usePostBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.ADMIN, 'books'],
    mutationFn: postBooks,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.ADMIN, 'books']);
      queryClient.invalidateQueries([QueryKeys.USER, 'books']);
    },
  });
};

export const usePatchBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.ADMIN, 'books'],
    mutationFn: patchBook,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.ADMIN, 'books']);
      queryClient.invalidateQueries([QueryKeys.USER, 'books']);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.ADMIN, 'books'],
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.ADMIN, 'books']);
      queryClient.invalidateQueries([QueryKeys.USER, 'books']);
    },
  });
};

export const useLogin = () => {
  const { setIsLogin, setAccessToken } = useUserStore.getState();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QueryKeys.LOGIN],
    mutationFn: login,
    onSuccess: (data) => {
      if (!data) return;
      setIsLogin(true);
      setAccessToken(data.accessToken);
      secureLocalStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refreshToken);
      navigate('/user');
    },
  });
};

export const useGetUser = (flag: boolean) => {
  return useQuery({
    queryKey: [QueryKeys.USER],
    queryFn: getUser,
    enabled: !!flag,
  });
};

export const useGetComments = (bookId: number) => {
  const key = [QueryKeys.USER, 'comments', bookId.toString()];

  return useQuery({
    queryKey: key,
    queryFn: () => getComments(bookId),
    select: (res) => res,
  });
};
export const usePatchComment = (bookId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'comments', bookId.toString()],
    mutationFn: patchComment,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'comments', bookId.toString()]);
    },
  });
};
export const usePostComment = (bookId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'comments', bookId.toString()],
    mutationFn: (comment: string) => postComment(bookId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'comments', bookId.toString()]);
    },
  });
};

export const useDeleteComment = (bookId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.USER, 'comments', bookId.toString()],
    mutationFn: (commentId: number) => deleteComment(bookId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'comments', bookId.toString()]);
    },
  });
};

export const useInfinityScroll = (order: 'DESC' | 'ASC', search: string) => {
  return useInfiniteQuery({
    queryKey: [QueryKeys.USER, 'books', 'infinity', order, search],
    queryFn: ({ pageParam = 1 }) =>
      getBooks({
        page: pageParam,
        order__createdAt: order,
        where__title__i_like: search,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) {
        return;
      }
      if (pages.length < lastPage.total / 10) {
        return pages.length + 1;
      } else return undefined;
    },
  });
};

export const useGetBookLikes = (authorId: number) => {
  const key = [QueryKeys.USER, 'likes', authorId.toString()];

  return useQuery({
    queryKey: key,
    queryFn: () => getBooksLike(authorId),
    select: (res) => res,
  });
};

export const useGetBookIsLike = (bookId: number, userId: number) => {
  const queryClient = useQueryClient();
  const key = [QueryKeys.USER, 'islike', bookId.toString()];
  const isUserIdValid = userId !== null && userId > 0;
  return useQuery({
    queryKey: key,
    enabled: isUserIdValid,
    queryFn: () => getBookIsLike({ bookId, userId }),
    select: (res) => res,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'books']);
    },
  });
};

export const usePostBookLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'likes'],
    mutationFn: postBookLike,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'likes']);
    },
  });
};

export const useDeleteBookLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'likes'],
    mutationFn: deleteBookLike,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'likes']);
    },
  });
};
