import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { useGetBookLikes, usePatchUser } from 'queries';
import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { UserType } from 'types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Book } from 'components/user';
import { Stars, Stars2, Stars3 } from 'styles/StarParticles';
import * as S from 'styles/SearchStyled';
import CustomModal from 'components/modal/CustomModal';
const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nicknameBtn, setNicknameBtn] = useState(false);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwalert, setPwalert] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const user = useQueryClient().getQueryData<UserType>([QueryKeys.USER_DATA]);

  const authorId: number = user?.id || 0;

  const take = 4;

  const { mutate, status: patchStatus, error } = usePatchUser();

  const {
    data: LikesBooks,
    status,
    isSuccess,
  } = useGetBookLikes({ authorId: authorId, take: take, page: currentPage });

  const handlePageClick = (pageNum: number) => {
    if (status !== 'success') return;

    const totalPages = Math.ceil(LikesBooks.total / 4);

    if (pageNum < 1 || pageNum > totalPages) return;

    setCurrentPage(pageNum);
  };

  const queryClient = useQueryClient();
  const saveUserNickname = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({ nickname: nickname });
    queryClient.invalidateQueries([QueryKeys.USER_DATA]);
    setNickname('');
  };

  const patchPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPwalert(false);
    }
    if (password == confirmPassword) {
      setPwalert(true);
      mutate({ password: password });
    }
    if (error) {
      alert(error);
    }
  };

  const handleClick = (id: number) => {
    setModalOpen(true);
    unshowScroll();
    setSelectedBookId(id); // 선택된 책의 ID를 상태에 저장
  };

  const unshowScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  const showScroll = () => {
    document.body.style.overflow = 'unset';
  };

  const findSelectedBook = () => {
    return LikesBooks?.data
      .flatMap((data) => data?.api2)
      .find((api2) => api2?.id === selectedBookId);
  };
  const selectedBook = findSelectedBook();

  console.log('SelectedBookId', selectedBookId);

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
                      <span>{user?.nickname ? user.nickname : nickname}</span>
                      <button type="button" onClick={() => setNicknameBtn(!nicknameBtn)}>
                        {nicknameBtn ? '닉네임 변경 취소' : '닉네임 변경'}
                      </button>
                      <div style={{ display: nicknameBtn ? 'block' : 'none' }}>
                        <div className="changeNickname">
                          <input
                            placeholder="변경할 닉네임 입력"
                            onChange={(e) => setNickname(e.target.value)}
                          ></input>
                          <button onClick={saveUserNickname}>닉네임 변경</button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th>비밀번호 변경</th>
                  <td>
                    <div className="passwordtable">
                      <table>
                        <tbody>
                          <tr>
                            <th>새 비밀번호</th>
                            <td>
                              <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                              ></input>
                            </td>
                          </tr>
                          <tr>
                            <th>비밀번호 다시 입력</th>
                            <td>
                              <input
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                              ></input>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style={{ color: 'red', padding: '8px' }}>
                        {pwalert ? null : '비밀번호가 일치하지 않습니다'}
                      </p>
                      <button onClick={patchPassword}>비밀번호 변경</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <div className="likesbook">
            <h1>내가 좋아한 책</h1>
            {LikesBooks && LikesBooks.data.length > 0 ? (
              <Layout>
                <ArrowButton>
                  <IoIosArrowBack size={60} onClick={() => handlePageClick(currentPage - 1)} />
                </ArrowButton>
                <BookWrapper $isSuccess={isSuccess}>
                  {status === 'success' &&
                    LikesBooks.data.map((index) => {
                      const { id, title, images, ...spread } = index.api2;

                      return (
                        <div key={id}>
                          <Book
                            key={id}
                            id={id}
                            images={images}
                            title={title}
                            {...spread}
                            onClick={() => handleClick(id)}
                          />
                          {modalOpen && (
                            <CustomModal
                              bookId={selectedBookId}
                              book={selectedBook}
                              setModalOpen={setModalOpen}
                              showScroll={showScroll}
                            ></CustomModal>
                          )}
                        </div>
                      );
                    })}
                </BookWrapper>
                <ArrowButton>
                  <IoIosArrowForward size={60} onClick={() => handlePageClick(currentPage + 1)} />
                </ArrowButton>
              </Layout>
            ) : (
              <p>내가 좋아요한 책이 없습니다</p>
            )}
          </div>
        </div>
      </section>
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
    color: black;
  }
  .editNickname {
    background-color: transparent;
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

  .userTable .likesbook {
    align-items: center;
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
    font-size: 11px;
  }

  .changeNickname {
    margin: 10px 0px;
    padding: 10px;
    border: 1px solid #dadde4;
    background-color: #f0f0f0;
    color: #555;
    font-size: 11px;
    width: 70%;

    input {
      height: 22px;
      padding: 2px 5px;
      line-height: 22px;
      border: 1px solid #dadde4;
    }
  }

  .passwordtable {
    font-size: 12px;
    width: 270px;
  }
  .passwordtable th {
    border: none;
    background-color: transparent;
  }

  .passwordtable table {
    border-collapse: separate;
  }

  .passwordtable button {
    margin: 15px 8px;
  }

  h1 {
    color: black;
  }
  .likesbook h1 {
    margin-top: 80px;
  }
`;

// const NicknameBtn = styled.button`
//   background-image: linear-gradient(
//     to right,
//     ${(props) => (props.btnState ? '#a8abba, #8c8f98' : '#fff, #f1f1f1')}
//   );
// `;

const Wrapper = styled.div`
  grid-template-columns: repeat(12, 1fr);
  color: rgba(31, 31, 31, 0.7);
  font-weight: 900;
  padding-top: 80px;
`;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
`;

const BookWrapper = styled.div<{ $isSuccess?: boolean }>`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  width: 70%;
  transition: opacity 1s ease;
  opacity: ${({ $isSuccess }) => ($isSuccess ? 1 : 0)};
`;

const ArrowButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: black;
  cursor: pointer;
  margin: 0 50px;
`;
