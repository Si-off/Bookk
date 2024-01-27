import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getStyledColor } from 'utils';
import Book from '../../components/Book';
import { useGetBooks } from 'queries';
import { Stars, Stars2, Stars3 } from 'styles/StarParticles';
import { useQueryClient } from '@tanstack/react-query';
import { getNextBooks } from 'api';
import { CustomModal } from 'components/modal/CustomModal';
import { QueryKeys } from 'constant';

const TAKE = 10;

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const { data: books, status } = useGetBooks({ take: TAKE, page: currentPage });

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
          showScroll={showScroll}></CustomModal>
      )}
      <Stars />
      <Stars2 />
      <Stars3 />
      <Layout>
        {status === 'success' &&
          books?.data.map((book) => {
            return <Book key={book.id} {...book} onClick={() => handleClick(book.id)} />;
          })}
      </Layout>
    </>
  );
};

export default UserPage;

const Layout = styled.div`
  background-color: ${getStyledColor('cool_gray', 1200)};
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(500px, auto);
  grid-gap: 5px;
  padding: 100px 300px;
`;
