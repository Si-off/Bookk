import { create } from 'zustand';
import { ZustandUserType } from 'types';

interface UserStore {
  user: ZustandUserType | null;
  accessToken: string;
  refreshToken: string;
  setUser: (user: ZustandUserType) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  accessToken: '',
  refreshToken: '',
  setUser: (user) => set({ user: user }),
  setAccessToken: (token) => set({ accessToken: token }),
  setRefreshToken: (token) => set({ refreshToken: token }),
}));
