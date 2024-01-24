import { useCallback, useState } from "react";
import { BookReq } from "types";
interface BookInfoState {
  bookInfo: BookReq;
  setBookInfo: (newBookInfo: BookReq) => void;
}
const InitData: BookReq = {
  title: "",
  content: "",
  images: [],
};

const useBookInfo = (initData = InitData) => {
  const [bookInfo, setBookInfo] = useState(initData);
  const resetBookInfo = useCallback(() => {
    setBookInfo(InitData);
  }, []);

  return { bookInfo, setBookInfo, resetBookInfo };
};

export default useBookInfo;
