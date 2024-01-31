import { create } from 'zustand';

interface UserStore {
  accessToken: string;
  isLogin: boolean;
  isInit: boolean;
  setIsLogin: (state: boolean) => void;
  setIsInit: (state: boolean) => void;
  setAccessToken: (token: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  isInit: true,
  accessToken: '',
  setIsLogin: (state) => {
    set({ isLogin: state });
  },
  setIsInit: (state) => {
    set({ isInit: state });
  },
  setAccessToken: (state) => {
    set({ accessToken: state });
  },
}));
