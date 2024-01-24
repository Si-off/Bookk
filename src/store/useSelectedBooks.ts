import { create } from "zustand";
import { SelectedBookState, SelectedBook } from "types";

export const useSelectedBook = create<SelectedBookState>((set) => ({
  selectedBook: <SelectedBook>{},
  setSelectedBook: (newBookInfo: SelectedBook) =>
    set(() => ({ selectedBook: newBookInfo })),
}));
