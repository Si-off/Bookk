import styled from "styled-components";
import { Link } from "react-router-dom";

const NavigationItem = () => {
  return (
    <Wrapper>
      <LinkStyle to="/">
        <span>홈</span>
      </LinkStyle>
      <LinkStyle to="/admin">
        <span>관리자</span>
      </LinkStyle>
      <LinkStyle to="/user">
        <span>유저</span>
      </LinkStyle>
      <LinkStyle to="/login">
        {" "}
        <span>로그인</span>
      </LinkStyle>

      <LinkStyle to="/signup">
        {" "}
        <span>회원가입</span>
      </LinkStyle>
      <span>로그아웃</span>
    </Wrapper>
  );
};

export default NavigationItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  color: #212529;
`;
