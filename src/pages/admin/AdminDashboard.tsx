import { useNavigate } from 'react-router-dom';
import * as S from 'styles/AdminStyledTemp';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <S.Layout>
      <div style={{ display: 'flex', gap: '30px' }}>
        <S.Container>
          <S.ContainerHeader>
            <S.ContainerTitle>책 등록</S.ContainerTitle>
            <S.Wrapper $marginTop={30}>새로운 책을 등록할 수 있습니다.</S.Wrapper>
          </S.ContainerHeader>
          <S.Wrapper $marginTop={80}>
            <S.Button $variant="primary" onClick={() => navigate('/admin/create')}>
              이동하기
            </S.Button>
          </S.Wrapper>
        </S.Container>
        <S.Container>
          <S.ContainerHeader>
            <S.ContainerTitle>책 관리</S.ContainerTitle>
            <S.Wrapper $marginTop={30}>
              테이블에서 등록된 책의 정보와 수정 및 삭제를 할 수 있습니다.
            </S.Wrapper>
          </S.ContainerHeader>
          <S.Wrapper $marginTop={80}>
            <S.Button $variant="primary" onClick={() => navigate('/admin/books')}>
              이동하기
            </S.Button>
          </S.Wrapper>
        </S.Container>
        <S.Container>
          <S.ContainerHeader>
            <S.ContainerTitle>사용자 관리</S.ContainerTitle>
            <S.Wrapper $marginTop={30}>사용자 리스트를 확인하고</S.Wrapper>
            <S.Wrapper>USER 권한인 경우 회원탈퇴 시킬 수 있습니다.</S.Wrapper>
          </S.ContainerHeader>
          <S.Wrapper $marginTop={80}>
            <S.Button $variant="primary" onClick={() => navigate('/admin/users')}>
              이동하기
            </S.Button>
          </S.Wrapper>
        </S.Container>
      </div>
    </S.Layout>
  );
};

export default AdminDashboard;
