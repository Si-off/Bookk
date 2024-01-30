import { useCallback, useState } from 'react';
import { BookReq } from 'types';

const InitData: BookReq = {
  title: '',
  content: '',
  images: [],
};

const useBookInfo = (initData = InitData) => {
  const [bookInfo, setBookInfo] = useState(initData);

  const resetBookInfo = useCallback(() => {
    setBookInfo(InitData);
  }, [setBookInfo]);

  return { bookInfo, setBookInfo, resetBookInfo };
};

export default useBookInfo;
