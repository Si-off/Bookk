export type ImagesType = {
  id: number;
  updatedAt: string;
  createdAt: string;
  order: number;
  type: number;
  path: string;
  fbPath: string[];
};

export type AuthorType = {
  id: number;
  nickname: string;
  name: string;
  email: string;
  followerCount: number;
  followeeCount: number;
};

export type BookInfoType = {
  id: number;
  updatedAt: string;
  createdAt: string;
  title: string;
  content: string;
  clicks: number;
  likeCount: number;
  reply2Count: number;
  isSecret: boolean;
  images: ImagesType[];
  author: AuthorType;
  api2cate: string;
};

export type BooklistRes = {
  data: BookInfoType[];
  cursor: {
    after: number;
  };
  count: number;
  next: string;
  total: number;
};

export type BookReq = {
  title: string;
  content: string;
  images?: string[] | File[];
};

export type ZustandUserType = {
  id: number;
  name: string;
  nickname: string;
  email: string;
  followerCount: number;
  followeeCount: number;
};

export type UserState = {
  user: ZustandUserType | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUser: (user: ZustandUserType) => void;
};
export type BooklistParams = {
  take: number;
  page: number;
};

export type ErrorType = {
  message: string;
};
export type LoginParams = {
  email: string;
  password: string;
};
export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userInfo: ZustandUserType;
};
export type SignUpReq = {
  nickname: string;
  name: string;
  password: string;
  email: string;
};
export type SignUpRes = {
  accessToken: string;
  refreshToken: string;
  userInfo: ZustandUserType;
};

export type SelectedBookState = {
  selectedBook: SelectedBook;
  setSelectedBook: (newBookInfo: SelectedBook) => void;
};

export type SelectedBook = {
  title: string;
  content: string;
  images: ImagesType[];
};
