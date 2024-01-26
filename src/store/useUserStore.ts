import { create } from "zustand";

interface UserStore {
  user: null;
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
  setUser: (user: any) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLogin: false,
  setIsLogin: (state) => {
    set({ isLogin: state });
  },
  setUser: (user) => {
    set({ user });
  },
}));
