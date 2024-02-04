import { useQueryClient } from '@tanstack/react-query';
import { Loader } from 'components/shared';
import { QueryKeys } from 'constant';
import useAdminManage from 'hooks/useAdminManage';
import { useDeleteUser, useGetUserlist } from 'queries/users';
import { Fragment } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import * as S from 'styles/AdminStyledTemp';
import { UserType } from 'types';

const AdminManageUsers = () => {
  const queryClient = useQueryClient();
  const userRole = queryClient.getQueryData<UserType>([QueryKeys.USER_DATA])?.role;
  const { data: users, status: usersStatus, isLoading } = useGetUserlist();
  const { mutate } = useDeleteUser();
  const { currentPage, handleNextPage } = useAdminManage();

  if (!users || isLoading) {
    return <Loader />;
  }

  const handleRemove = (id: number, name: string, role: string) => {
    if (userRole === role) {
      console.error('권한이 같습니다.');
      return;
    }
    alert(`${name}이 제거되었습니다.`);
    mutate(id);
  };

  return (
    <S.Layout>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>사용자 목록</S.ContainerTitle>
        </S.ContainerHeader>
        <S.Table>
          <S.Theader>
            <S.Trow>
              <S.Tcolumn>No.</S.Tcolumn>
              <S.Tcolumn>이름</S.Tcolumn>
              <S.Tcolumn>닉네임</S.Tcolumn>
              <S.Tcolumn>이메일</S.Tcolumn>
              <S.Tcolumn>권한</S.Tcolumn>
              <S.Tcolumn>회원 탈퇴</S.Tcolumn>
            </S.Trow>
          </S.Theader>
          <S.Tbody>
            {usersStatus === 'success' &&
              users.map((user, index) => {
                return (
                  <Fragment key={user.id}>
                    <S.Trow>
                      <S.Tcell width={30}>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
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
              })}
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
            <S.PaginationButton disabled={currentPage === 1}>
              <FaAngleLeft onClick={() => handleNextPage(currentPage - 1)} />
            </S.PaginationButton>
            <div>
              {Array.from({ length: Math.ceil(users?.length / 10) }, (_, index) => (
                <S.PaginationNumber
                  key={index}
                  onClick={() => handleNextPage(index + 1)}
                  $isCurrentPage={currentPage === index + 1}
                >
                  {index + 1}
                </S.PaginationNumber>
              ))}
            </div>
            <S.PaginationButton disabled={currentPage >= Math.ceil(users.length) / 10}>
              <FaAngleRight onClick={() => handleNextPage(currentPage + 1)} />
            </S.PaginationButton>
          </S.Pagination>
        </div>
      </S.Container>
    </S.Layout>
  );
};

export default AdminManageUsers;
