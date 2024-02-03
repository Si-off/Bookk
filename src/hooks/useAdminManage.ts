import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AllowDataType = {
  BookTakelistRes: 'BookTakelistRes';
  CommentTakelistRes: 'CommentTakelistRes';
};

const useAdminManage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = useCallback((pageNum: number) => {
    setCurrentPage(pageNum);
  }, []);

  const handleNavigate = useCallback((type: keyof AllowDataType, id: number | string) => {
    switch (type) {
      case 'BookTakelistRes':
        navigate(`/admin/books/detail/${id}`);
        break;

      default:
        break;
    }
  }, []);

  return { currentPage, setCurrentPage, handleNextPage, handleNavigate };
};

export default useAdminManage;
