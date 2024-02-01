import { AdminNav } from 'components/admin';
import { TAKE } from 'constant';
import { useGetBooksAdmin } from 'queries';
import { useGetUserlist } from 'queries/users';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';
import { getStyledColor, pixelToRem } from 'utils';

const AdminMain = () => {
  useGetBooksAdmin({ take: TAKE, page: 1 });
  useGetUserlist();

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
  background-color: ${getStyledColor('gray', 200)};
  width: 100%;
  height: 100vh;
  color: #242424;
  overflow-y: hidden;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  min-width: ${pixelToRem(290)};
  padding: 20px;
  overflow-y: scroll;
`;
