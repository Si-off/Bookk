import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logout } from 'api/auth';
import { useUserStore } from 'store/useUserStore';

const NavigationItem = () => {
  const { isLogin } = useUserStore();

  return (
    <Wrapper>
      {!isLogin && (
        <>
          <LinkStyle to='/login'>
            {' '}
            <span>로그인</span>
          </LinkStyle>
          <LinkStyle to='/signup'>
            {' '}
            <span>회원가입</span>
          </LinkStyle>
        </>
      )}
      {isLogin && (
        <>
          <LinkStyle to='/admin'>
            <span>관리자</span>
          </LinkStyle>

          <LinkStyle to='/user'>
            <span>유저</span>
          </LinkStyle>
          <button onClick={() => logout()}>로그아웃</button>
        </>
      )}
    </Wrapper>
  );
};

export default NavigationItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;

  span {
    color: white;
  }

  button {
    background-color: transparent;
    color: white;
  }
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
`;
