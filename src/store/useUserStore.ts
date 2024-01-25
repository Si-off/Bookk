import { create } from 'zustand';

interface UserStore {
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  setIsLogin: (state) => {
    set({ isLogin: state });
  },
}));
