import { useState } from 'react';
import { styled } from 'styled-components';
import { getStyledColor } from 'utils';
import Book from '../../components/Book';
import { useGetBooks } from 'queries';

const UserPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: books, status, isSuccess } = useGetBooks({ take: 4, page: currentPage });

  return (
    <Layout>
      <BookWrapper $isSuccess={isSuccess}>
        {status === 'success' &&
          books.data.map((book) => {
            return <Book key={book.id} {...book} />;
          })}
      </BookWrapper>
    </Layout>
  );
};

export default UserPage;

const Layout = styled.div`
  height: 100vh;
  background-color: ${getStyledColor('cool_gray', 1200)};
`;

const BookWrapper = styled.div<{ $isSuccess?: boolean }>`
  display: flex;
  width: 70%;
  transition: opacity 1s ease;
  opacity: ${({ $isSuccess }) => ($isSuccess ? 1 : 0)};
`;
