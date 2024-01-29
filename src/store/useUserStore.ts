import { AuthorType } from 'types';
import { create } from 'zustand';

interface UserStore {
  user: AuthorType | null;
  accessToken: string;
  isLogin: boolean;
  isInit: boolean;
  setIsLogin: (state: boolean) => void;
  setIsInit: (state: boolean) => void;
  setUser: (user: any) => void;
  setAccessToken: (token: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLogin: false,
  isInit: true,
  accessToken: '',
  setIsLogin: (state) => {
    set({ isLogin: state });
  },
  setIsInit: (state) => {
    set({ isInit: state });
  },
  setUser: (user) => {
    set({ user });
  },
  setAccessToken: (state) => {
    set({ accessToken: state });
  },
}));
