import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaPenToSquare, FaRegTrashCan, FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import * as S from 'styles/AdminStyledTemp';

import { useDeleteBook, useGetBooksAdmin } from 'queries';
import { getStyledColor } from 'utils';
import { useSelectedBook } from 'store/useSelectedBooks';
import { getDateStr } from 'utils';
import { BookInfoType, BookTakelistRes } from 'types';
import { useQueryClient } from '@tanstack/react-query';
import { getNextBooks } from 'api';
import { QueryKeys } from 'constant';
import Loader from 'components/shared/Loader';

const AdminManage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const {
    data: books,
    status,
    isLoading: booksLoading,
  } = useGetBooksAdmin({
    take: 10,
    page: currentPage,
    order__createdAt: 'DESC',
    where__title__i_like: '',
  });

  const queryClient = useQueryClient();
  const key = [QueryKeys.ADMIN, 'books', (currentPage + 1).toString()];

  useEffect(() => {
    if (currentPage) {
      queryClient.prefetchQuery({
        queryKey: key,
        queryFn: () =>
          getNextBooks({
            take: 10,
            page: currentPage + 1,
            order__createdAt: 'DESC',
            where__title__i_like: '',
          }),
      });
    }
  }, [currentPage]);

  const { setSelectedBook } = useSelectedBook();
  const { mutate: remove, isLoading } = useDeleteBook();

  const navigate = useNavigate();

  const unshowScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  const showScroll = () => {
    document.body.style.overflow = 'unset';
  };
  const findSelectedBook = () => {
    return books?.data.find((book) => book?.id === selectedBookId);
  };
  const selectedBook = findSelectedBook();
  const handleClick = (id: number) => {
    setModalOpen(true);
    unshowScroll();
    setSelectedBookId(id); // 선택된 책의 ID를 상태에 저장
  };

  const goToCreate = () => {
    navigate('/admin/create');
  };

  const handleEdit = (id: any) => {
    if (!books) return;
    const selectedBook: BookInfoType | undefined = books.data.find(
      (book) => book.id === parseInt(id)
    );
    if (!selectedBook) return;
    const { images, title, content } = selectedBook;

    setSelectedBook({ title, content, images });
    navigate(`/admin/edit/${id}`);
  };

  const handleRemove = (id: any) => {
    remove(id);
  };
  const handlePageClick = (pageNum: number) => {
    if (status !== 'success') return;
    if (!books) return;

    const totalPages = Math.ceil(books.total / 10);

    if (pageNum < 1 || pageNum > totalPages) return;

    setCurrentPage(pageNum);
  };

  if (booksLoading || !books) {
    return (
      <S.Layout>
        {booksLoading && <Loader />}
        {!booksLoading && !books && <div>데이터가 없습니다.</div>}
      </S.Layout>
    );
  }

  // type bookType = Pick<BookTakelistRes, 'data'>;
  // const renderTableRow = (book: bookType, index: number) => {
  //   const { id, title, createdAt, updatedAt, likeCount, clicks, reply2Count, author } = book;

  //   // 데이터가 존재하는 경우에만 출력
  //   return (
  //     <S.Trow key={id}>
  //       <S.Tcell>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
  //       <S.Tcell>{id}</S.Tcell>
  //       <S.Tcell>
  //         <button onClick={() => handleClick(id)}>{title}</button>
  //       </S.Tcell>
  //       <S.Tcell>{author.name}</S.Tcell>
  //       <S.Tcell>{clicks}</S.Tcell>
  //       <S.Tcell>{likeCount}</S.Tcell>
  //       <S.Tcell>{reply2Count}</S.Tcell>
  //       <S.Tcell>{getDateStr(createdAt)}</S.Tcell>
  //       <S.Tcell>
  //         <EditIcon onClick={() => handleEdit(id)} />
  //         <TrashIcon onClick={() => handleRemove(id)} />
  //       </S.Tcell>
  //     </S.Trow>
  //   );
  // };

  // // 테이블 바디 렌더링
  // const renderTableBody = () => {
  //   let renderedRows = [];

  //   // 데이터가 존재하는 행을 렌더링
  //   if (status === 'success') {
  //     renderedRows = books.data.map((book, index) => renderTableRow(book, index));
  //   }

  //   // 빈 행을 추가하여 테이블의 크기를 고정
  //   const emptyRowCount = 10 - renderedRows.length;
  //   for (let i = 0; i < emptyRowCount; i++) {
  //     renderedRows.push(
  //       <S.Trow key={`empty-${i}`}>
  //         {[...Array(9)].map((_, index) => (
  //           <S.Tcell key={`empty-cell-${index}`} />
  //         ))}
  //       </S.Trow>
  //     );
  //   }

  //   return renderedRows;
  // };

  return (
    <S.Layout>
      <S.Container hidden={booksLoading}>
        <ButtonContainer>
          <CreateButton onClick={() => goToCreate()}>책 등록하기</CreateButton>
        </ButtonContainer>
        {/* <S.Tbody>{renderTableBody()}</S.Tbody> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
          }}>
          <Pagination>
            <PButton>
              <FaAngleLeft onClick={() => handlePageClick(currentPage - 1)} />
            </PButton>
            {Array.from({ length: Math.ceil(books?.total / 10) }, (_, index) => (
              <PNumber key={index} onClick={() => handlePageClick(index + 1)}>
                {index + 1}
              </PNumber>
            ))}
            <PButton>
              <FaAngleRight onClick={() => handlePageClick(currentPage + 1)} />
            </PButton>
          </Pagination>
        </div>
      </S.Container>
    </S.Layout>
  );
};

export default AdminManage;
const EditIcon = styled(FaPenToSquare)`
  font-size: 20px;
  transition: color 0.15s ease;
  color: ${getStyledColor('cool_gray', 700)};
  &:hover {
    color: ${getStyledColor('blue', 900)};
  }
  &:active {
    color: ${getStyledColor('blue', 1000)};
  }
  margin-right: 20px;
  cursor: pointer;
`;

const TrashIcon = styled(FaRegTrashCan)`
  font-size: 20px;
  transition: color 0.15s ease;
  color: ${getStyledColor('cool_gray', 700)};
  &:hover {
    color: ${getStyledColor('red', 900)};
  }
  &:active {
    color: ${getStyledColor('red', 1000)};
  }
  cursor: pointer;
`;

const Pagination = styled.nav`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const PNumber = styled.button`
  padding: 8px;
  background-color: #fff;
  border: 1px solid ${getStyledColor('blue', 400)};
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${getStyledColor('blue', 400)};
  }

  &:active {
    background-color: ${getStyledColor('blue', 500)};
  }
`;

const PButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: #fff;
`;

const Layout = styled.div`
  min-width: 1200px;
  padding: 45px;
  overflow-x: scroll;
  height: 100vh;
  background-color: white;
`;

const CreateButton = styled.div`
  background-color: #008cba;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  margin-bottom: 20px;
  justify-content: start;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
