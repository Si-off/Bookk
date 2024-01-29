import React from 'react';
import { useUserStore } from 'store/useUserStore';
import { styled } from 'styled-components';

const MyPage = () => {
  const { user } = useUserStore();

  console.log(user);
  return (
    <Wrapper>
      <div className='one'>
        <div className='1'>내정보</div>
        <div>이메일:{(user as any)?.email}</div>
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
  }
`;
