import { useState } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { getStyledColor } from 'utils';
import { useUserStore } from 'store/useUserStore';
import Book from '../../components/Book';
import { useGetBooks } from 'queries';

const UserPage = () => {
  const user = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: books, status } = useGetBooks({ take: 4, page: currentPage });

  return (
    <Wrap>
      <Header>
        {user.user ? (
          <>
            <Name>{user.user.nickname}</Name>
            {/* 로그인 후 전역상태관리 User 체크 후에 수정 예정 */}
          </>
        ) : (
          <>
            <StyledLink to='/login'>로그인</StyledLink>
            <StyledLink to='/signup'>회원가입</StyledLink>
          </>
        )}
      </Header>
      <Main>
        <BookLayout>
          {status === 'success' &&
            books.data.map((book) => {
              return <Book key={book.id} {...book} />;
            })}
        </BookLayout>
      </Main>
    </Wrap>
  );
};

export default UserPage;

const Wrap = styled.div`
  height: 100vh;
  overflow-y: hidden;
  background-color: ${getStyledColor('gray', 1100)};
`;

const Header = styled.header`
  position: absolute;
  width: 100%;
  padding: 30px;
  background-color: ${getStyledColor('gray', 1200)};
`;
const Main = styled.main`
  display: flex;
  padding: 30px 0px;
  overflow-x: hidden;
  align-items: flex-end;
  height: 100%;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${getStyledColor('red', 900)};
  }
`;

const Name = styled.div`
  color: #fff;
`;

const BookLayout = styled.div`
  display: flex;
`;
