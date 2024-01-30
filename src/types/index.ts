export type ImagesType = {
  id: number;
  updatedAt: string;
  createdAt: string;
  order: number;
  type: number;
  path: string;
  fbPath: string[];
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
  author: UserType;
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

export type BookTakelistRes = {
  data: BookInfoType[];
  total: number;
};

export type ImagePatchReq = {
  id: number;
  newOrder: number;
};

export type BookPatchReq = {
  title: string;
  content: string;
  images: ImagePatchReq[];
};

export type BookReq = {
  title: string;
  content: string;
  images?: string[] | File[];
};

export type BookRes = {
  id: number;
  updatedAt: string;
  createdAt: string;
  title: string;
  content: string;
  clicks: number;
  likeCount: number;
  reply2Count: number;
  isSecret: boolean;
  author: {
    id: number;
    nickname: string;
    name: string;
    email: string;
    followerCount: number;
    followeeCount: number;
  };
  images: Array<{
    id: number;
    updatedAt: string;
    createdAt: string;
    order: number;
    type: number;
    path: string;
    fbPath: Array<string>;
  }>;
  api2cate: null | any; // 여기서 any는 api2cate의 실제 타입에 따라 달라질 수 있습니다.
  reply2s: Array<any>; // reply2s의 구체적인 타입이 명시되지 않았으므로 any를 사용하거나, 해당 타입을 정의해야 합니다.
};
export type BookAddImageRes = {
  images: Array<{
    id: number;
    updatedAt: string;
    createdAt: string;
    order: number;
    type: number;
    path: string;
    fbPath: Array<string>;
  }>;
};
export type UserType = {
  id: number;
  name: string;
  nickname: string;
  email: string;
  followerCount: number;
  followeeCount: number;
  role: string;
};

export type BooklistParams = {
  take?: number;
  page?: number;
  order__createdAt: 'DESC' | 'ASC';
  where__title__i_like: string;
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
  userInfo: UserType;
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
  userInfo: UserType;
};

export type SelectedBookState = {
  selectedBook: SelectedBook;
  setSelectedBook: (newBookInfo: SelectedBook) => void;
};

export type SelectedBook = {
  title: string;
  content: string;
  images?: ImagesType[];
};

export type CommentPostRes = {
  reply2: string;
  api2: {
    id: number;
  };
  author: {
    id: number;
    nickname: string;
    name: string;
    email: string;
    followerCount: number;
    followeeCount: number;
    profileImg: string[];
  };
};
export type CommentGetRes = {
  data: Array<{
    id: number;
    updatedAt: string;
    createdAt: string;
    reply2: string;
    likeCount: number;
    author: {
      id: number;
      nickname: string;
    };
  }>;
  total: number;
};

export type PatchCommentReq = {
  bookId: number;
  commentId: number;
  comment: string;
};

export type BookisLikeRes = {
  isLike: boolean;
  likeId: number;
};
