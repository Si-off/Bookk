import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { getStyledColor, pixelToRem } from 'utils';

const AdminMain = () => {
  return (
    <Layout>
      <Nav>
        <ul>
          <StyledLink to={'create'}>책 등록</StyledLink>
          <StyledLink to={'edit'}>asd</StyledLink>
        </ul>
      </Nav>
      <Main>
        <Outlet />
      </Main>
    </Layout>
  );
};

export default AdminMain;

const Layout = styled.div`
  display: flex;
  background-color: ${getStyledColor('admin', 'background')};
  width: 100%;
  height: 100vh;
`;

const Nav = styled.nav`
  background-color: #fff;
  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color ease 0.2s;
  white-space: nowrap;
`;

const Main = styled.main`
  min-width: ${pixelToRem(290)};
`;

// const Main = styled.main``;
// const Main = styled.main``;
// const Main = styled.main``;
