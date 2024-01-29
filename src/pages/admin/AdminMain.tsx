import { AdminNav } from 'components/admin';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { getStyledColor, pixelToRem } from 'utils';

const AdminMain = () => {
  return (
    <Layout>
      <AdminNav />
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

  color: ${getStyledColor('admin', 'black')};
`;

const Main = styled.main`
  min-width: ${pixelToRem(290)};
  padding: 20px;
`;
