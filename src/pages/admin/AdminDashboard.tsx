import * as S from 'styles/AdminStyledTemp';

const AdminDashboard = () => {
  return (
    <>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>C TITLE</S.ContainerTitle>
        </S.ContainerHeader>

        <S.Button variant='primary'>primary</S.Button>
        <S.Button variant='secondary'>secondary</S.Button>
        <S.Button variant='success'>success</S.Button>
        <S.Button variant='warning'>warning</S.Button>
        <S.Button variant='error'>error</S.Button>
      </S.Container>
    </>
  );
};

export default AdminDashboard;
