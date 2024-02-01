import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import useAdminManage from 'hooks/useAdminManage';
import { useDeleteUser, useGetUserlist } from 'queries/users';
import { Fragment } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import * as S from 'styles/AdminStyledTemp';
import { UserType } from 'types';

const AdminManageUsers = () => {
  const queryClient = useQueryClient();
  const { data: users, status: usersStatus, isLoading } = useGetUserlist();
  const { mutate } = useDeleteUser();
  const { currentPage, setCurrentPage, handleEdit, handleNextPage } = useAdminManage();

  if (!users || isLoading) {
    return <div>loading</div>;
  }

  const handleRemove = (id: number, role: string) => {
    if (queryClient.getQueryData<UserType>([QueryKeys.USER_DATA])?.role === role) {
      console.error('권한이 같습니다.');
    }
    console.log('delete ' + id);
    // mutate(id);
  };

  return (
    <S.Layout>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>C TITLE</S.ContainerTitle>
        </S.ContainerHeader>
        <S.Table>
          <S.Theader>
            <S.Trow>
              <S.Tcolumn>ID</S.Tcolumn>
              <S.Tcolumn>이름</S.Tcolumn>
              <S.Tcolumn>닉네임</S.Tcolumn>
              <S.Tcolumn>이메일</S.Tcolumn>
              <S.Tcolumn>권한</S.Tcolumn>
              <S.Tcolumn />
            </S.Trow>
          </S.Theader>
          <S.Tbody>
            {usersStatus === 'success' &&
              users.map((user, index) => {
                return (
                  <Fragment key={user.id}>
                    <S.Trow>
                      <S.Tcell width={30}>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
                      <S.Tcell width={50}>{user.id}</S.Tcell>
                      <S.Tcell width={300}>{user.name}</S.Tcell>
                      <S.Tcell width={120}>{user.nickname}</S.Tcell>
                      <S.Tcell>{user.email}</S.Tcell>
                      <S.Tcell>{user.role}</S.Tcell>
                      <S.Tcell>
                        <S.EditIcon onClick={() => handleEdit('UserType', user.id)} />
                        <S.TrashIcon onClick={() => handleRemove(user.id, user.role)} />
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
            <S.PaginationButton>
              <FaAngleLeft onClick={() => handleNextPage(currentPage - 1)} />
            </S.PaginationButton>
            {/* <div>
              {Array.from({ length: Math.ceil(users?.total / 10) }, (_, index) => (
                <S.PaginationNumber key={index} onClick={() => handleNextPage(index + 1)}>
                  {index + 1}
                </S.PaginationNumber>
              ))}
            </div> */}
            <S.PaginationButton>
              <FaAngleRight onClick={() => handleNextPage(currentPage + 1)} />
            </S.PaginationButton>
          </S.Pagination>
        </div>
      </S.Container>
    </S.Layout>
  );
};

export default AdminManageUsers;
