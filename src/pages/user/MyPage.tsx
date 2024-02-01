import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { useGetBookLikes } from 'queries';
import { useState } from 'react';
import { styled } from 'styled-components';
import { UserType } from 'types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Book } from 'components/user';
import { Stars, Stars2, Stars3 } from 'styles/StarParticles';
const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const user = useQueryClient().getQueryData<UserType>([QueryKeys.USER_DATA]);

  const authorId: number = user?.id || 0;
  console.log(authorId);

  const {
    data: LikesBooks,
    status,
    isSuccess,
  } = useGetBookLikes({ authorId: authorId, take: 4, page: currentPage });

  const handlePageClick = (pageNum: number) => {
    // TODO 타입 가드 잘못작성함
    // if (status !== 'success') return;
    if (!LikesBooks) return;

    const totalPages = Math.ceil(LikesBooks.total / 4);

    if (pageNum < 1 || pageNum > totalPages) return;

    setCurrentPage(pageNum);
  };

  console.log('LikesBooks', LikesBooks);

  return (
    <Wrapper>
      <Stars />
      <Stars2 />
      <Stars3 />
      <div className="one">
        <h1 className="1">내정보</h1>
        <div>이메일:{user?.email}</div>
        <div>닉네임:{user?.nickname}</div>
        <button style={{ marginRight: '20px' }}>비밀번호 변경</button>
        <button>닉네임 변경</button>
      </div>
      <div className="two">
        <h2>내가 좋아요 한 책</h2>
        <Layout>
          <ArrowButton>
            <IoIosArrowBack size={60} onClick={() => handlePageClick(currentPage - 1)} />
          </ArrowButton>
          <BookWrapper $isSuccess={isSuccess}>
            {status === 'success' &&
              LikesBooks.data.map((index) => {
                const { id, title, images, ...spread } = index.api2;

                return <Book key={id} id={id} images={images} title={title} {...spread} />;
              })}
          </BookWrapper>
          <ArrowButton>
            <IoIosArrowForward size={60} onClick={() => handlePageClick(currentPage + 1)} />
          </ArrowButton>
        </Layout>
      </div>
    </Wrapper>
  );
};

export default MyPage;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  color: rgba(31, 31, 31, 0.7);
  font-weight: 900;
  padding-top: 80px;
  .one {
    grid-column: 2 / -2;
    grid-row: 1;
    height: 400px;
    border-radius: 8.889px;
    border: 1.778px solid #ebebee;
    background: #fff;
    box-shadow: 0px 3.556px 5.333px 0px rgba(0, 0, 0, 0.15);
    line-height: 2.1;
    padding: 20px;
    h1 {
      color: black;
    }
  }

  .two {
    grid-column: 2 / -2;
    margin-top: 20px;
    color: white;
  }
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
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
