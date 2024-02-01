import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AllowDataType = {
  UserType: 'UserType';
  BookTakelistRes: 'BookTakelistRes';
};

const useAdminManage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = useCallback((pageNum: number) => {
    setCurrentPage(pageNum);
  }, []);

  const handleEdit = useCallback((type: keyof AllowDataType, id: number | string) => {
    switch (type) {
      case 'UserType':
        navigate(`/admin/users/detail/${id}`);
        break;
      case 'BookTakelistRes':
        navigate(`/admin/books/detail/${id}`);
        break;

      default:
        break;
    }
  }, []);

  return { currentPage, setCurrentPage, handleNextPage, handleEdit };
};

export default useAdminManage;
