import { create } from "zustand";
import { ZustandUserType } from "types";
export const useUserStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: (user: ZustandUserType) => set({ user: user }),
  setAccessToken: (token: string) => set({ accessToken: token }),
  setRefreshToken: (token: string) => set({ refreshToken: token }),
}));
