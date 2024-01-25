import Axios from "api/axios";
import {
  BookReq,
  BooklistParams,
  BooklistRes,
  BookRes,
  BookPatchReq,
  BookAddImageRes,
} from "types";

export const getBooks = async (queries: BooklistParams) => {
  const res = await new Axios("/api2s").get<BooklistRes>(queries);

  return res;
};

export const postBooks = async (params: BookReq) => {
  if (params.images && params.images[0] instanceof File) {
    const fileName = await postImage(params.images[0]);
    if (fileName) params.images[0] = fileName;
  }
  const res = await new Axios("/api2s").post(params);

  return res;
};

export const getBook = async (id: number) => {
  const res = await new Axios(`/api2s/${id}`).get<BookRes>();

  return res;
};

export const patchBook = async (params: BookPatchReq & { id: number }) => {
  // if (params.images && params.images[0] instanceof File) {
  //   const fileName = await postImage(params.images[0]);
  //   if (fileName) params.images[0] = fileName;
  // }
  const { id, ...rest } = params;

  const res = await new Axios(`/api2s/${id}`).patch(rest);

  return res;
};

export const deleteBook = async (id: number) => {
  const res = await new Axios(`/api2s/${id}`).delete();

  return res;
};

export const postImage = async (
  imageFile: File
): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await new Axios("/fb/image/temp").post<{
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
