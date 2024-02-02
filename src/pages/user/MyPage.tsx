import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { useGetBookLikes, usePatchUser } from 'queries';
import { useState } from 'react';
import { styled } from 'styled-components';
import { UserType } from 'types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Book } from 'components/user';
import { Stars, Stars2, Stars3 } from 'styles/StarParticles';
import * as S from 'styles/SearchStyled';
const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const user = useQueryClient().getQueryData<UserType>([QueryKeys.USER_DATA]);

  const authorId: number = user?.id || 0;

  const { mutate, status: patchStatus } = usePatchUser();

  const {
    data: LikesBooks,
    status,
    isSuccess,
  } = useGetBookLikes({ authorId: authorId, take: 4, page: currentPage });

  const handlePageClick = (pageNum: number) => {
    if (status !== 'success') return;

    const totalPages = Math.ceil(LikesBooks.total / 4);

    if (pageNum < 1 || pageNum > totalPages) return;

    setCurrentPage(pageNum);
  };

  const setUserNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event?.target.value);
    // console.log('nickname', nickname);
  };

  const saveUserNickname = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({ nickname: nickname });
    }
  };

  const setUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target.value);
    // console.log('nickname', nickname);
  };

  const saveUserPassword = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({ password: password });
    }
  };

  console.log('LikesBooks', LikesBooks);

  return (
    <Container>
      <section>
        <div className="userTable">
          <h1 className="tbody">내정보</h1>
          <form>
            <table>
              <tbody>
                <tr>
                  <th>아이디(이메일)</th>
                  <td>{user?.email}</td>
                </tr>
                <tr>
                  <th>닉네임</th>
                  <td>
                    <div>
                      <span>{user?.nickname}</span>
                      <button type="button">닉네임 변경</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </section>
      <Wrapper>
        <Stars />
        <Stars2 />
        <Stars3 />

        <div className="one">
          <h1 className="1">내정보</h1>

          <div>이메일:{user?.email}</div>
          <div style={{ marginBottom: '20px' }}>닉네임:{user?.nickname}</div>
        </div>

        <div className="two">
          <div>
            <h1 className="1">내정보 수정</h1>
            <input
              placeholder="변경할 닉네임 입력"
              onChange={setUserNickname}
              onKeyDown={(e) => saveUserNickname(e)}
            ></input>
            <S.SearchButton>닉네임 변경</S.SearchButton>
          </div>
          <div>
            <input
              placeholder="변경할 패스워드 입력"
              onChange={setUserNickname}
              onKeyDown={(e) => saveUserNickname(e)}
            ></input>
            <S.SearchButton style={{ marginRight: '20px' }}>비밀번호 변경</S.SearchButton>
          </div>
        </div>

        <div className="three">
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
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  position: relative;
  min-width: 980px;
  overflow: hidden;

  .userTable {
    min-height: 200px;
    margin: 100px 100px 30px;
    padding: 50px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-collapse: collapse;
  }

  .userTable table {
    border-collapse: collapse;
    width: 100%;
  }

  .userTable th {
    width: 200px;
  }

  .userTable th,
  .userTable td {
    border: 1px solid #ddd; /* 테이블의 경계 선 스타일 및 색상 설정 */
    padding: 8px;
    text-align: left;
  }

  .userTable th {
    background-color: #f2f2f2; /* 헤더 배경색 설정 */
  }

  button {
    padding: 5px 10px;
    margin: 0px 20px 0px;
    border: 1px solid #bcbfc6;
    color: #777;
    background-color: #fafbf6;
    background-image: linear-gradient(#fff, #f1f1f1);
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  color: rgba(31, 31, 31, 0.7);
  font-weight: 900;
  padding-top: 80px;
  .one {
    grid-column: 2 / 6;
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
    grid-column: 8 / -2;
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

  .three {
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
