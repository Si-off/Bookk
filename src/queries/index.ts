import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBooks, postBooks, patchBook, deleteBook, getBook } from "api";
import { BooklistParams, BooklistRes } from "types";
import queryKeys from "./queryKeys";

export const useGetBooks = (queries: BooklistParams) => {
  const queryClient = useQueryClient();
  const key = [queryKeys.USER, "books"];
  if (queries) key.push(queries.page.toString());

  return useQuery({
    queryKey: key,
    queryFn: () => getBooks(queries),
    onSuccess: async (res: BooklistRes) => {
      if (!queries) return;
      if (res.total < queries.take * queries.page) return;

      await queryClient.prefetchQuery({
        queryKey: [queryKeys.USER, "books", (queries.page + 1).toString()],
        queryFn: () => getBooks({ ...queries, page: queries.page + 1 }),
        staleTime: 1000 * 60 * 3,
        cacheTime: 1000 * 60 * 5,
      });
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 5,
  });
};
export const useGetBooksAdmin = (queries: BooklistParams) => {
  const queryClient = useQueryClient();
  const key = [queryKeys.ADMIN, "books"];
  if (queries) key.push(queries.page.toString());

  return useQuery({
    queryKey: key,
    queryFn: () => getBooks(queries),
    onSuccess: async (res: BooklistRes) => {
      if (!queries) return;
      if (res.total < queries.take * queries.page) return;

      await queryClient.prefetchQuery({
        queryKey: [queryKeys.ADMIN, "books", (queries.page + 1).toString()],
        queryFn: () => getBooks({ ...queries, page: queries.page + 1 }),
        staleTime: 1000 * 60 * 3,
        cacheTime: 1000 * 60 * 5,
      });
    },
  });
};

export const useGetBook = (id: number) => {
  const queryClient = useQueryClient();
  const key = [queryKeys.ADMIN, "books", id.toString()];
  return useQuery({
    queryKey: key,
    queryFn: () => getBook(id),
    select: (res) => res,
  });
};

export const usePostBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.ADMIN, "books"],
    mutationFn: postBooks,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.ADMIN, "books"]);
    },
  });
};

export const usePatchBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.ADMIN, "books"],
    mutationFn: patchBook,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.ADMIN, "books"]);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [queryKeys.ADMIN, "books"],
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.ADMIN, "books"]);
    },
  });
};
