import React from 'react';
import { styled } from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { UserType } from 'types';
const MyPage = () => {
  const user = useQueryClient().getQueryData<UserType>([QueryKeys.USER_DATA]);
  return (
    <Wrapper>
      <div className="one">
        <h1 className="1">내정보</h1>
        <div>이메일:{user?.email}</div>
        <div>닉네임:{user?.nickname}</div>
        <button style={{ marginRight: '20px' }}>비밀번호 변경</button>
        <button>닉네임 변경</button>
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
  grid-auto-rows: minmax(100px, auto);
  grid-template-rows: repeat(2, 1fr);

  .one {
    grid-column: 2 / -2;
    grid-row: 1;
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
`;
