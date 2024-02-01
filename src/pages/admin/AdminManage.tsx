import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import * as S from 'styles/AdminStyledTemp';
import { useDeleteBook, useGetBooksAdmin } from 'queries';
import { useSelectedBook } from 'store/useSelectedBooks';
import { getDateStr } from 'utils';
import { BookInfoType } from 'types';
import { useQueryClient } from '@tanstack/react-query';
import { getNextBooks } from 'api';
import { CustomModal } from 'components/modal/CustomModal';
import Loader from 'components/shared/Loader';
import { QueryKeys, TAKE } from 'constant';

const AdminManage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const navigate = useNavigate();

  const { setSelectedBook } = useSelectedBook();
  const { mutate: remove } = useDeleteBook();

  const { data: books, status } = useGetBooksAdmin({
    take: TAKE,
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
            take: TAKE,
            page: currentPage + 1,
            order__createdAt: 'DESC',
            where__title__i_like: '',
          }),
      });
    }
  }, [currentPage]);

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

  const handleEdit = (id: number) => {
    if (!books) return;
    const selectedBook: BookInfoType | undefined = books.data.find((book) => book.id === id);
    if (!selectedBook) return;
    const { images, title, content } = selectedBook;

    setSelectedBook({ title, content, images });
    navigate(`/admin/books/detail/${id}`);
  };

  const handleRemove = (id: number) => {
    remove(id);
  };
  const handlePageClick = (pageNum: number) => {
    if (status !== 'success') return;
    if (!books) return;

    const totalPages = Math.ceil(books.total / 10);

    if (pageNum < 1 || pageNum > totalPages) return;

    setCurrentPage(pageNum);
  };

  if (status === 'loading' || !books) {
    return (
      <S.Layout>
        {status === 'loading' && <Loader />}
        {status === 'success' && !books && <div>데이터가 없습니다.</div>}
      </S.Layout>
    );
  }

  return (
    <S.Layout>
      <S.Container>
        <S.Table>
          <S.Theader>
            <S.Trow>
              <S.Tcolumn>No.</S.Tcolumn>
              <S.Tcolumn>ID</S.Tcolumn>
              <S.Tcolumn>제목</S.Tcolumn>
              <S.Tcolumn>생성자</S.Tcolumn>
              <S.Tcolumn>조회수</S.Tcolumn>
              <S.Tcolumn>좋아요</S.Tcolumn>
              <S.Tcolumn>댓글</S.Tcolumn>
              <S.Tcolumn>생성일</S.Tcolumn>
              <S.Tcolumn />
            </S.Trow>
          </S.Theader>
          <S.Tbody>
            {status === 'success' &&
              books.data.map((book, index) => {
                return (
                  <Fragment key={book.id}>
                    <S.Trow>
                      <S.Tcell width={30}>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
                      <S.Tcell width={50}>{book.id}</S.Tcell>
                      <S.Tcell width={300}>
                        <button onClick={() => handleClick(book.id)}>{book.title}</button>
                      </S.Tcell>
                      <S.Tcell width={120}>{book.author.name}</S.Tcell>
                      <S.Tcell>{book.clicks}</S.Tcell>
                      <S.Tcell>{book.likeCount}</S.Tcell>
                      <S.Tcell>{book.reply2Count}</S.Tcell>
                      <S.Tcell>{getDateStr(book.createdAt)}</S.Tcell>
                      <S.Tcell>
                        <S.EditIcon onClick={() => handleEdit(book.id)} />
                        <S.TrashIcon onClick={() => handleRemove(book.id)} />
                      </S.Tcell>
                    </S.Trow>
                    {modalOpen && (
                      <CustomModal
                        bookId={selectedBookId}
                        book={selectedBook}
                        setModalOpen={setModalOpen}
                        showScroll={showScroll}
                      ></CustomModal>
                    )}
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
              <FaAngleLeft onClick={() => handlePageClick(currentPage - 1)} />
            </S.PaginationButton>
            <div>
              {Array.from({ length: Math.ceil(books?.total / 10) }, (_, index) => (
                <S.PaginationNumber key={index} onClick={() => handlePageClick(index + 1)}>
                  {index + 1}
                </S.PaginationNumber>
              ))}
            </div>
            <S.PaginationButton>
              <FaAngleRight onClick={() => handlePageClick(currentPage + 1)} />
            </S.PaginationButton>
          </S.Pagination>
        </div>
      </S.Container>
    </S.Layout>
  );
};

export default AdminManage;
