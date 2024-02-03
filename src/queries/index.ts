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
  getCount,
  getReplies,
} from 'api';
import {
  BookTakelistRes,
  BookisLikeRes,
  BooklistParams,
  CommentGetRes,
  LikesBooklistParams,
  MyFavorites,
  UserType,
} from 'types';
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
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 5,
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

export const useDeleteBook = (page?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.ADMIN, 'books'],
    mutationFn: deleteBook,
    onMutate: async (id) => {
      if (!page) return;
      const key = [QueryKeys.ADMIN, 'books', page.toString()];
      await queryClient.cancelQueries({ queryKey: key });

      const previousBooks = queryClient.getQueryData<BookTakelistRes>(key)?.data;

      if (previousBooks) {
        const updatedBooks = previousBooks.filter((book) => book.id !== id);
        queryClient.setQueryData(key, { data: updatedBooks });
      }
      return { previousBooks };
    },
    onError: (err, _, context) => {
      const key = [QueryKeys.ADMIN, 'books', page];
      queryClient.setQueryData(key, context?.previousBooks);
    },
    onSettled: () => {
      queryClient.invalidateQueries([QueryKeys.ADMIN, 'books']);
      queryClient.invalidateQueries([QueryKeys.USER, 'books']);
    },
  });
};

export const useLogin = () => {
  const { setIsLogin, setAccessToken } = useUserStore.getState();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QueryKeys.USER_DATA],
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
    queryKey: [QueryKeys.USER_DATA],
    queryFn: getUser,
    enabled: !!flag,
  });
};

export const useGetComments = (bookId: number) => {
  const key = [QueryKeys.USER, 'comments', bookId.toString()];
  const isBookIdValid = bookId !== null && bookId > 0;
  return useQuery({
    queryKey: key,
    queryFn: () => getComments(bookId),
    select: (res) => res,
    enabled: isBookIdValid,
  });
};
export const usePatchComment = (bookId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'comments', bookId.toString()],
    mutationFn: ({
      bookId,
      commentId,
      comment,
    }: {
      bookId: number;
      commentId: number;
      comment: string;
    }) => patchComment({ bookId, commentId, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'comments', bookId.toString()]);
    },
  });
};
export const usePostComment = (bookId: number) => {
  const queryClient = useQueryClient();
  const user = useQueryClient().getQueryData<UserType>([QueryKeys.USER_DATA]);

  return useMutation({
    mutationKey: [QueryKeys.USER, 'comments', bookId.toString()],
    mutationFn: (comment: string) => {
      return postComment(bookId, comment);
    },
    onMutate: async (comment: string) => {
      if (!user) throw new Error('User not found');

      await queryClient.cancelQueries([QueryKeys.USER, 'comments', bookId.toString()]);
      const previousComments = queryClient.getQueryData<CommentGetRes>([
        QueryKeys.USER,
        'comments',
        bookId.toString(),
      ]);
      queryClient.setQueryData(
        [QueryKeys.USER, 'comments', bookId.toString()],
        (old?: CommentGetRes) => {
          if (!old) {
            // 데이터가 없는 경우, 새 구조를 생성
            return {
              data: [
                {
                  // 새 댓글 객체의 구조를 정의합니다. 예시에서는 임시 ID와 기타 필요한 필드를 설정합니다.
                  id: Date.now(), // 임시 ID
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  reply2: comment,
                  likeCount: 0,
                  author: {
                    id: user?.id, // 현재 사용자 ID
                    nickname: user?.nickname, // 현재 사용자 닉네임
                    role: user?.role, // 현재 사용자 역할
                  },
                },
              ],
              cursor: {
                after: null,
              },
              count: 1,
              next: null,
              total: 1,
            };
          } else {
            // 기존 데이터에 새 댓글을 추가
            return {
              ...old,
              data: [
                ...old.data,
                {
                  id: Date.now(), // 임시 ID
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  reply2: comment,
                  likeCount: 0,
                  author: {
                    id: user?.id, // 이 부분은 현재 로그인한 사용자의 정보를 어떻게 가져올지에 따라 달라집니다.
                    nickname: user?.nickname,
                    role: user?.role,
                  },
                },
              ],
              count: old.count + 1,
              total: old.total + 1,
            };
          }
        },
      );
      return { previousComments };
    },
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
    onMutate: async (commentId: number) => {
      await queryClient.cancelQueries([QueryKeys.USER, 'comments', bookId.toString()]);
      const previousComments = queryClient.getQueryData<CommentGetRes>([
        QueryKeys.USER,
        'comments',
        bookId.toString(),
      ]);
      queryClient.setQueryData(
        [QueryKeys.USER, 'comments', bookId.toString()],
        (old?: CommentGetRes) => {
          if (!old) return;
          return {
            ...old,
            data: old.data.filter((comment) => comment.id !== commentId),
            count: old.count - 1,
            total: old.total - 1,
          };
        },
      );
      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'comments', bookId.toString()]);
    },
  });
};

export const useInfinityScroll = (
  order: 'DESC' | 'ASC' | 'CLICKS' | 'LIKECOUNT',
  search: string,
) => {
  return useInfiniteQuery({
    queryKey: [QueryKeys.USER, 'books', 'infinity', order, search],
    queryFn: ({ pageParam = 1 }) => {
      const queryParameters: BooklistParams = {
        page: pageParam,
        take: 8,
      };
      if (search) {
        queryParameters.where__title__i_like = search;
      }

      // Set order parameters based on the order value
      if (order === 'CLICKS') {
        queryParameters.order__clicks = 'DESC';
      } else if (order === 'LIKECOUNT') {
        queryParameters.order__likeCount = 'DESC';
      } else {
        queryParameters.order__createdAt = order; // Include only for ASC or DESC
      }

      return getBooks(queryParameters);
    },
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

export const useGetBookLikes = (queries: LikesBooklistParams) => {
  const queryClient = useQueryClient();
  const { isLogin } = useUserStore.getState();

  const key = [QueryKeys.USER, 'likes', queries.page.toString()];
  if (queries) key.push(queries.page.toString());

  return useQuery({
    queryKey: key,
    queryFn: () => getBooksLike(queries),
    enabled: isLogin && !!queries.authorId,
    onSuccess: async (res: MyFavorites) => {
      if (!queries) return;
      if (res.total < queries.take * queries.page) return;

      await queryClient.prefetchQuery({
        queryKey: [QueryKeys.USER, 'likes', (queries.page + 1).toString()],
        queryFn: () => getBooks({ ...queries, page: queries.page + 1 }),
        staleTime: 1000 * 60 * 3,
        cacheTime: 1000 * 60 * 5,
      });
    },
  });
};

export const useGetBookIsLike = (bookId: number, userId: number) => {
  const key = [QueryKeys.USER, 'likes', bookId.toString()];
  const { isLogin } = useUserStore.getState();

  const isUserIdValid = userId !== null && userId > 0;
  return useQuery({
    queryKey: key,
    enabled: isUserIdValid && isLogin,
    queryFn: () => getBookIsLike({ bookId, userId }),
    select: (res) => res,
  });
};

export const usePostBookLike = ({ bookId }: { bookId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'likes', bookId.toString()],
    mutationFn: postBookLike,
    onMutate: async () => {
      await queryClient.cancelQueries([QueryKeys.USER, 'likes', bookId.toString()]);

      const previousLikes = queryClient.getQueryData([QueryKeys.USER, 'likes', bookId.toString()]);

      queryClient.setQueryData(
        [QueryKeys.USER, 'likes', bookId.toString()],
        (old?: BookisLikeRes) => {
          if (!old) return;
          return {
            ...old,
            isLike: !old.isLike,
            likeCount: old.likeCount + 1,
          };
        },
      );
      return { previousLikes };
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'likes', bookId.toString()]);
    },
  });
};

export const useDeleteBookLike = ({ bookId }: { bookId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'likes', bookId.toString()],
    mutationFn: deleteBookLike,
    onMutate: async () => {
      await queryClient.cancelQueries([QueryKeys.USER, 'likes', bookId.toString()]);

      const previousLikes = queryClient.getQueryData([QueryKeys.USER, 'likes', bookId.toString()]);

      queryClient.setQueryData(
        [QueryKeys.USER, 'likes', bookId.toString()],
        (old?: BookisLikeRes) => {
          if (!old) return;
          return {
            ...old,
            isLike: !old.isLike,
            likeCount: old.likeCount - 1,
          };
        },
      );

      return { previousLikes };
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'likes', bookId.toString()]);
    },
  });
};

export const useGetCount = () => {
  return useQuery({
    queryKey: [QueryKeys.ADMIN, 'count'],
    queryFn: getCount,
  });
};

export const useGetReplies = () => {
  return useQuery({
    queryKey: [QueryKeys.ADMIN, 'replies'],
    queryFn: getReplies,
  });
};
