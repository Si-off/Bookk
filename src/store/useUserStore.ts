import { create } from 'zustand';
import { ZustandUserType } from 'types';
import { UserState } from 'types';
export const useUserStore = create<UserState>((set) => ({
  user: null,
  accessToken: '',
  refreshToken: '',
  setUser: (user) => set({ user: user }),
  setAccessToken: (token) => set({ accessToken: token }),
  setRefreshToken: (token) => set({ refreshToken: token }),
}));
