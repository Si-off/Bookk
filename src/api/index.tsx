import Axios from "api/axios";
import { BookReq, BooklistParams } from "types";

export const getBooks = async (queries: BooklistParams) => {
  const res = await Axios("/api2s").get(queries);

  return res;
};

export const postBooks = async (params: BookReq) => {
  if (params.images && params.images[0]) {
    const fileName = await postImage(params.images[0] as unknown as File);
    if (fileName) params.images[0] = fileName;
  }
  const res = await Axios("/api2s").post(params);

  return res;
};

export const getBook = async (id: number) => {
  const res = await Axios(`/api2s/${id}`).get();

  return res;
};

export const patchBook = async (params: BookReq & { id: number }) => {
  if (params.images && params.images[0]) {
    const fileName = await postImage(params.images[0] as unknown as File);
    if (fileName) params.images[0] = fileName;
  }
  const { id, ...rest } = params;

  const res = await Axios(`/api2s/${id}`).patch(rest);

  return res;
};

export const deleteBook = async (id: number) => {
  const res = await Axios(`/api2s/${id}`).remove();

  return res;
};

export const postImage = async (
  imageFile: File
): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await Axios("/common/image").post(formData);
    return res.fileName;
  } catch (error) {
    console.log(error);
  }
};
