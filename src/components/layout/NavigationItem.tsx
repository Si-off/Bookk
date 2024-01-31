import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logout } from 'api/auth';
import { useUserStore } from 'store/useUserStore';
import { getStyledColor, pixelToRem } from 'utils';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { UserType } from 'types';

const NavigationItem = () => {
  const { isLogin } = useUserStore();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<UserType>([QueryKeys.USER_DATA]);

  return (
    <Wrapper>
      {!isLogin && (
        <>
          <LinkStyle to="/login">
            <Text>로그인</Text>
          </LinkStyle>
          <LinkStyle to="/signup">
            <Text>회원가입</Text>
          </LinkStyle>
        </>
      )}
      {isLogin && (
        <>
          {data?.role === 'MANAGER' && (
            <LinkStyle to="/admin">
              <Text>관리자</Text>
            </LinkStyle>
          )}

          <LinkStyle to="/user">
            <Text>유저</Text>
          </LinkStyle>

          <LinkStyle to="/mypage">
            <Text>마이페이지</Text>
          </LinkStyle>

          <Logout onClick={() => logout()}>로그아웃</Logout>
        </>
      )}
    </Wrapper>
  );
};

export default NavigationItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
  height: 100%;
  gap: 25px;

  @media screen and (max-width: 768px) {
    width: auto;
    gap: ${pixelToRem(10)};
  }
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
`;

const Text = styled.div`
  height: 100%;
  color: ${getStyledColor('white', 'high')};
  font-size: ${pixelToRem(16)};
  transition: color 0.2s ease;
  font-weight: 500;

  &:hover {
    color: ${getStyledColor('primary', 200)};
  }

  @media screen and (max-width: 768px) {
    font-size: ${pixelToRem(12)};
  }
`;

const Logout = styled.button`
  height: 100%;
  color: ${getStyledColor('white', 'high')};
  background-color: inherit;
  transition: color 0.2s ease;
  font-weight: 500;

  &:hover {
    color: ${getStyledColor('primary', 200)};
  }

  @media screen and (max-width: 768px) {
    font-size: ${pixelToRem(12)};
    align-self: flex-end;
  }
`;
