import { getAxiosInstance as Axios } from './axios/index';

import {
  BookReq,
  BooklistParams,
  BooklistRes,
  BookRes,
  BookPatchReq,
  BookAddImageRes,
  CommentGetRes,
  CommentPostRes,
  PatchCommentReq,
  BookTakelistRes,
  BookisLikeRes,
  LikesBooklistParams,
  MyFavorites,
  UserPatchReq,
  Countlist,
  RepliesList,
} from 'types';

export const getBooks = async (queries?: BooklistParams) => {
  let res;
  if (queries) {
    res = await Axios('/api2s').get<BookTakelistRes>(queries);
  } else {
    res = await Axios('/api2s').get<BooklistRes>(queries);
  }

  return res;
};

export const getNextBooks = async (queries: BooklistParams) => {
  const res = await Axios('/api2s').get<BooklistRes>(queries);
  return res;
};

export const postBooks = async (params: BookReq) => {
  if (params.images && params.images[0] instanceof File) {
    const fileName = await postImage(params.images[0]);
    if (fileName) params.images[0] = fileName;
  }
  const res = await Axios('/api2s').post(params);

  return res;
};

export const getBook = async (id: number) => {
  const res = await Axios(`/api2s/${id}`).get<BookRes>();

  return res;
};

export const patchBook = async (params: BookPatchReq & { id: number }) => {
  // if (params.images && params.images[0] instanceof File) {
  //   const fileName = await postImage(params.images[0]);
  //   if (fileName) params.images[0] = fileName;
  // }
  const { id, ...rest } = params;

  const res = await Axios(`/api2s/${id}`).patch(rest);

  return res;
};

export const patchUser = async (params: UserPatchReq) => {
  const res = await Axios('users/update').patch(params);

  return res;
};

export const deleteBook = async (id: number) => {
  const res = await Axios(`/api2s/${id}`).remove({ id });
  return res;
};

export const postImage = async (imageFile: File): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await Axios('/fb/image/temp').post<{
    tempFilePath: string[];
  }>(formData);
  return res?.tempFilePath[0];
};

export const deleteImage = async (bookId: number, imageId: number) => {
  const res = await Axios(`/api2s/${bookId}/delete-image/${imageId}`).remove();
  return res;
};

export const addImage = async (bookId: number, images: string[]) => {
  const res = await Axios(`/api2s/${bookId}/add-image`).post<BookAddImageRes>({
    images: images,
  });
  return res;
};
export const getComments = async (bookId: number) => {
  const res = await Axios(`/api2s/${bookId}/reply2s`).get<CommentGetRes>();
  return res;
};
export const postComment = async (bookId: number, comment: string) => {
  const res = await Axios(`/api2s/${bookId}/reply2s`).post<CommentPostRes>({
    reply2: comment,
  });
  return res;
};
export const patchComment = async (params: PatchCommentReq) => {
  const { bookId, comment, commentId } = params;
  const res = await Axios(`/api2s/${bookId}/reply2s/${commentId}`).patch({
    reply2: comment,
  });
  return res;
};
export const deleteComment = async (bookId: number, commentId: number) => {
  const res = await Axios(`/api2s/${bookId}/reply2s/${commentId}`).remove();
  return res;
};
export const getBooksLike = async (params: LikesBooklistParams) => {
  const { authorId, take, page } = params;

  const res = await Axios(
    `/users/${authorId}/like2s?take=${take}&page=${page}&order__updatedAt=DESC`,
  ).get<MyFavorites>();
  return res;
};

export const getBookIsLike = async ({ bookId, userId }: { bookId: number; userId: number }) => {
  const res = await Axios(`/api2s/${bookId}/${userId}/is-like`).get<BookisLikeRes>();
  return res;
};

export const postBookLike = async (bookId: number) => {
  const res = await Axios(`/api2s/${bookId}/like2s`).post();
  return res;
};

export const deleteBookLike = async ({
  bookId,
  likeId,
}: {
  bookId: number;
  likeId: number | undefined;
}) => {
  if (!likeId) return;
  const res = await Axios(`/api2s/${bookId}/like2s/${likeId}`).remove();
  return res;
};

export const getCount = async () => {
  const res = await Axios(`/api2s/count`).get<Countlist>();

  return res;
};

export const getReplies = async () => {
  const res = await Axios(`/api2s/replies`).get<RepliesList>();

  return res;
};
