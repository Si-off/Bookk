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

export type GetBooklistRes = {
  data: BookInfoType[];
  cursor: {
    after: number;
  };
  count: number;
  next: string;
  total: number;
};

export type PostBookParams = {
  title: string;
  content: string;
  images?: string[];
};

export type ZustandUserType = {
  author: {
    id: number;
    nickname: string;
    name: string;
    email: string;
    followerCount: number;
    followeeCount: number;
  };
};
export type GetBookQueries = {
  take: number;
  page: number;
};
