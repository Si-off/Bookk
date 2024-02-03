import { Fragment } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import useAdminManage from 'hooks/useAdminManage';
import * as S from 'styles/AdminStyledTemp';

const AdminManageReviews = () => {
  const { currentPage, setCurrentPage, handleNextPage, handleNavigate } = useAdminManage();

  return (
    <S.Layout>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>댓글 목록</S.ContainerTitle>
        </S.ContainerHeader>
        <S.Table>
          <S.Theader>
            <S.Trow>
              <S.Tcolumn>No.</S.Tcolumn>
              <S.Tcolumn>ID</S.Tcolumn>
              <S.Tcolumn>이름</S.Tcolumn>
              <S.Tcolumn>닉네임</S.Tcolumn>
              <S.Tcolumn>이메일</S.Tcolumn>
              <S.Tcolumn>권한</S.Tcolumn>
              <S.Tcolumn>회원 탈퇴</S.Tcolumn>
            </S.Trow>
          </S.Theader>
          <S.Tbody>
            {/* {status === 'success' &&
              users.map((user, index) => {
                return (
                  <Fragment key={user.id}>
                    <S.Trow>
                      <S.Tcell width={30}>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
                      <S.Tcell width={50}>{user.id}</S.Tcell>
                      <S.Tcell width={100}>{user.name}</S.Tcell>
                      <S.Tcell width={250}>{user.nickname}</S.Tcell>
                      <S.Tcell>{user.email}</S.Tcell>
                      <S.Tcell>{user.role}</S.Tcell>
                      <S.Tcell>
                        {userRole !== 'ADMIN' && userRole !== 'MANAGER' ? (
                          <S.TrashIcon
                            onClick={() => handleRemove(user.id, user.name, user.role)}
                          />
                        ) : (
                          '-'
                        )}
                      </S.Tcell>
                    </S.Trow>
                  </Fragment>
                );
              })} */}
          </S.Tbody>
        </S.Table>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
          }}
        >
          <S.Pagination>
            <S.PaginationButton>
              <FaAngleLeft onClick={() => handleNextPage(currentPage - 1)} />
            </S.PaginationButton>
            <div>
              {/* {Array.from({ length: Math.ceil(users?.length / 10) }, (_, index) => (
                <S.PaginationNumber key={index} onClick={() => handleNextPage(index + 1)}>
                  {index + 1}
                </S.PaginationNumber>
              ))} */}
            </div>
            <S.PaginationButton>
              <FaAngleRight onClick={() => handleNextPage(currentPage + 1)} />
            </S.PaginationButton>
          </S.Pagination>
        </div>
      </S.Container>
    </S.Layout>
  );
};

export default AdminManageReviews;
