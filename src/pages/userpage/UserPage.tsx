import React from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';
import { getStyledColor } from 'utils';
import Book from '../../components/Book';
import { useGetBooks } from 'queries';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Stars, Stars2, Stars3 } from 'styles/StarParticles';
// import { useQuery, useQueryClient } from '@tanstack/react-query';

const TAKE = 4;

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: books,
    status,
    isSuccess,
    isFetching,
    isPreviousData,
  } = useGetBooks({ take: TAKE, page: currentPage });

  // const queryClient = useQueryClient();

  // React.useEffect(() => {
  //   if (!isPreviousData && books) {
  //     console.log('books hasmore?', books);
  //     queryClient.prefetchQuery({
  //       queryKey: ['projects', currentPage + 1],
  //       queryFn: () => useGetBooks({ take: 4, page: currentPage + 1 }),
  //     });
  //   }
  // }, [books, isPreviousData, currentPage, queryClient]);

  const handlePageClick = (pageNum: number) => {
    if (status !== 'success') return;

    const totalPages = Math.ceil(books.total / TAKE);

    if (pageNum < 1 || pageNum > totalPages) return;

    setCurrentPage(pageNum);
  };

  return (
    <>
      <Stars />
      <Stars2 />
      <Stars3 />
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
    </>
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
  color: rgba(100, 100, 100, 0.7);
  cursor: pointer;
  margin: 0 50px;

  transition: color 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;
