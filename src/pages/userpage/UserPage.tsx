import { useState } from 'react';
import { styled } from 'styled-components';
import { getStyledColor } from 'utils';
import Book from '../../components/Book';
import { useGetBooks } from 'queries';
import { BooklistParams } from 'types';
import { getBook } from 'api';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: books,
    status,
    isSuccess,
  } = useGetBooks({ take: 4, page: currentPage });

  const handlePageClick = (pageNum: number) => {
    if (status !== 'success') return;

    const totalPages = Math.ceil(books.total / 4);

    if (pageNum < 1 || pageNum > totalPages) return;

    setCurrentPage(pageNum);
  };

  return (
    <Layout>
      <ArrowButton>
        <IoIosArrowBack
          size={60}
          onClick={() => handlePageClick(currentPage - 1)}
        />
      </ArrowButton>
      <BookWrapper $isSuccess={isSuccess}>
        {status === 'success' &&
          books.data.map((book) => {
            return <Book key={book.id} {...book} />;
          })}
      </BookWrapper>
      <ArrowButton>
        <IoIosArrowForward
          size={60}
          onClick={() => handlePageClick(currentPage + 1)}
        />
      </ArrowButton>
    </Layout>
  );
};

export default UserPage;

const Layout = styled.div`
  height: 100vh;
  background-color: ${getStyledColor('cool_gray', 1200)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookWrapper = styled.div<{ $isSuccess?: boolean }>`
  display: flex;
  width: 70%;
  transition: opacity 1s ease;
  opacity: ${({ $isSuccess }) => ($isSuccess ? 1 : 0)};
`;

const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  cursor: pointer;
  margin: 0 50px;
`;
