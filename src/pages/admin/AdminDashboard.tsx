import { useGetCount } from 'queries';
import { useNavigate } from 'react-router-dom';
import * as S from 'styles/AdminStyledTemp';
import { styled } from 'styled-components';
import { getStyledColor } from 'utils';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: count } = useGetCount();

  return (
    <S.Layout style={{ flexWrap: 'wrap' }}>
      <Wrap>
        <S.Container onClick={() => navigate('books')}>
          <S.ContainerHeader>
            <S.ContainerTitle>등록된 책 권수</S.ContainerTitle>
          </S.ContainerHeader>
          <Text>{count?.totalApi2s}권</Text>
        </S.Container>
        <S.Container onClick={() => navigate('books')}>
          <S.ContainerHeader>
            <S.ContainerTitle>총 조회수</S.ContainerTitle>
          </S.ContainerHeader>
          <Text>{count?.totalClicks}회</Text>
        </S.Container>
        <S.Container onClick={() => navigate('books')}>
          <S.ContainerHeader>
            <S.ContainerTitle>총 좋아요 수</S.ContainerTitle>
          </S.ContainerHeader>
          <Text>{count?.totalLikes}개</Text>
        </S.Container>
        <S.Container onClick={() => navigate('reviews')}>
          <S.ContainerHeader>
            <S.ContainerTitle>총 댓글 수</S.ContainerTitle>
          </S.ContainerHeader>
          <Text>{count?.totalReplies}개</Text>
        </S.Container>
      </Wrap>
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

const Wrap = styled.div`
  display: flex;
  gap: 50px;
  white-space: nowrap;

  & ${S.Container} {
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: ${getStyledColor('teal', 400)};
    }
  }

  & ${S.ContainerTitle} {
    color: ${getStyledColor('teal', 900)};
    font-size: 18px;
  }

  & ${S.ContainerHeader} {
    min-height: 30px;
  }
`;
const Text = styled.div`
  text-align: center;
`;
