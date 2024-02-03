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
const MyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nicknameBtn, setNicknameBtn] = useState(false);
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

  useEffect(() => {
    setNickname(user?.nickname || '');
  }, [QueryKeys.USER_DATA]);

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

  const queryClient = useQueryClient();
  const saveUserNickname = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate({ nickname: nickname });
    setNickname('');
  };

  const setUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event?.target.value);
    // console.log('nickname', nickname);
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
                      <span>{user?.nickname ? user.nickname : nickname}</span>
                      <button
                        // btnState={nicknameBtn}
                        type="button"
                        onClick={() => setNicknameBtn(!nicknameBtn)}
                      >
                        {nicknameBtn ? '닉네임 변경 취소' : '닉네임 변경'}
                      </button>
                      <form style={{ display: nicknameBtn ? 'block' : 'none' }}>
                        <div className="changeNickname">
                          <input
                            placeholder="변경할 닉네임 입력"
                            onChange={setUserNickname}
                          ></input>
                          <button onClick={saveUserNickname}>닉네임 변경</button>
                        </div>
                      </form>
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
                            <th>현재 비밀번호</th>
                            <td>
                              <input type="password"></input>
                            </td>
                          </tr>
                          <tr>
                            <th>새 비밀번호</th>
                            <td>
                              <input type="password"></input>
                            </td>
                          </tr>
                          <tr>
                            <th>비밀번호 다시 입력</th>
                            <td>
                              <input type="password"></input>
                            </td>
                          </tr>
                          <button>비밀번호 변경</button>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
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
