import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getStyledColor } from 'utils';
import Book from '../../components/Book';
import { useGetBooks } from 'queries';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Stars, Stars2, Stars3 } from 'styles/StarParticles';
import { useQueryClient } from '@tanstack/react-query';
import { getNextBooks } from 'api';
import { CustomModal } from 'components/modal/CustomModal';
import { QueryKeys } from 'constant';
import './UserPage.style.css';

const TAKE = 10;

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const {
    data: books,
    status,
    isSuccess,
  } = useGetBooks({ take: TAKE, page: currentPage });

  const queryClient = useQueryClient();
  const key = [QueryKeys.USER, 'books', nextPage.toString()];

  useEffect(() => {
    if (nextPage) {
      queryClient.prefetchQuery({
        queryKey: key,
        queryFn: () => getNextBooks({ take: TAKE, page: nextPage }),
      });
    }
  }, [nextPage]);

  const handlePageClick = (pageNum: number) => {
    if (status !== 'success') return;
    if (!books) return;

    const totalPages = Math.ceil(books.total / TAKE);

    if (pageNum < 1 || pageNum > totalPages) return;

    setCurrentPage(pageNum);
    setNextPage(pageNum + 1);
  };

  const unshowScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  const showScroll = () => {
    document.body.style.overflow = 'unset';
  };
  const handleClick = (id: number) => {
    setModalOpen(true);
    unshowScroll();
    setSelectedBookId(id); // 선택된 책의 ID를 상태에 저장
  };
  return (
    <>
      {modalOpen && (
        <CustomModal
          bookId={selectedBookId}
          setModalOpen={setModalOpen}
          showScroll={showScroll}
        ></CustomModal>
      )}
      <Stars />
      <Stars2 />
      <Stars3 />
      <Layout>
        {/* <ArrowButton>
          <IoIosArrowBack size={60} onClick={() => handlePageClick(currentPage - 1)} />
        </ArrowButton> */}
        {status === 'success' &&
          books?.data.map((book) => {
            return (
              <Book
                key={book.id}
                {...book}
                onClick={() => handleClick(book.id)}
              />
            );
          })}
        {/* <ArrowButton>
          <IoIosArrowForward size={60} onClick={() => handlePageClick(currentPage + 1)} />
        </ArrowButton> */}
      </Layout>
    </>
  );
};

export default UserPage;

// const Layout = styled.div`
//   height: 100vh;
//   background-color: ${getStyledColor('cool_gray', 1200)};
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Layout = styled.div`
  background-color: ${getStyledColor('cool_gray', 1200)};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(500px, auto);
  grid-gap: 5px;
  padding: 100px 300px;
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
