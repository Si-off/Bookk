import { create } from "zustand";
import { ZustandUserType } from "types";
import { UserState } from "types";
export const useUserStore = create<UserState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: (user: ZustandUserType) => set({ user: user }),
  setAccessToken: (token: string) => set({ accessToken: token }),
  setRefreshToken: (token: string) => set({ refreshToken: token }),
}));
