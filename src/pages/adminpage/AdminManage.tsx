import React, { useState } from "react";
import styled from "styled-components";
import { useUserStore } from "store/useUserStore";
import { useNavigate } from "react-router-dom";
import {
  FaPenToSquare,
  FaRegTrashCan,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa6";
import * as S from "styles/AdminStyled";
import { StyledLoader } from "styles/LoginStyled";
import { useDeleteBook, useGetBooksAdmin } from "queries";
import { getStyledColor } from "utils";
import { useSelectedBook } from "store/useSelectedBooks";
import { getDateStr } from "utils";
import { BookInfoType } from "types";
import { CustomModal } from "components/modal/CustomModal";
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
  });

  const { setSelectedBook } = useSelectedBook();
  const { mutate: remove, isLoading } = useDeleteBook();

  const navigate = useNavigate();

  const user = useUserStore((state: any) => state.user);
  console.log("user", user);
  const unshowScroll = () => {
    document.body.style.overflow = "hidden";
  };
  const showScroll = () => {
    document.body.style.overflow = "unset";
  };
  const handleClick = (id: number) => {
    setModalOpen(true);
    unshowScroll();
    setSelectedBookId(id); // 선택된 책의 ID를 상태에 저장
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
    if (status !== "success") return;

    const totalPages = Math.ceil(books.total / 10);

    if (pageNum < 1 || pageNum > totalPages) return;

    setCurrentPage(pageNum);
  };

  return (
    <>
      {modalOpen && (
        <CustomModal
          bookId={selectedBookId}
          setModalOpen={setModalOpen}
          showScroll={showScroll}
        ></CustomModal>
      )}
      <Layout>
        <S.Container>
          {isLoading || booksLoading ? (
            <StyledLoader />
          ) : !books ? (
            <div>데이터가 없습니다.</div>
          ) : (
            <>
              <S.Table>
                <S.Theader>
                  <S.Trow>
                    <S.Tcolumn>ID</S.Tcolumn>
                    <S.Tcolumn>제목</S.Tcolumn>
                    <S.Tcolumn>생성자</S.Tcolumn>
                    <S.Tcolumn>조회수</S.Tcolumn>
                    <S.Tcolumn>좋아요</S.Tcolumn>
                    <S.Tcolumn>생성일</S.Tcolumn>
                    <S.Tcolumn />
                  </S.Trow>
                </S.Theader>
                <S.Tbody>
                  {status === "success" &&
                    books.data.map((book) => {
                      const {
                        id,
                        title,
                        createdAt,
                        updatedAt,
                        likeCount,
                        clicks,
                        reply2Count,
                        author,
                      } = book;
                      return (
                        <S.Trow key={id}>
                          <S.Tcell>{id}</S.Tcell>
                          <S.Tcell>
                            <button onClick={() => handleClick(id)}>
                              {title}
                            </button>
                          </S.Tcell>
                          <S.Tcell>{author.name}</S.Tcell>
                          <S.Tcell>{clicks}</S.Tcell>
                          <S.Tcell>{likeCount}</S.Tcell>
                          <S.Tcell>{getDateStr(createdAt)}</S.Tcell>
                          <S.Tcell>
                            <EditIcon onClick={() => handleEdit(id)} />
                            <TrashIcon onClick={() => handleRemove(id)} />
                          </S.Tcell>
                        </S.Trow>
                      );
                    })}
                </S.Tbody>
              </S.Table>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16px",
                }}
              >
                <Pagination>
                  <PButton>
                    <FaAngleLeft
                      onClick={() => handlePageClick(currentPage - 1)}
                    />
                  </PButton>
                  {Array.from(
                    { length: Math.ceil(books?.total / 10) },
                    (_, index) => (
                      <PNumber
                        key={index}
                        onClick={() => handlePageClick(index + 1)}
                      >
                        {index + 1}
                      </PNumber>
                    )
                  )}
                  <PButton>
                    <FaAngleRight
                      onClick={() => handlePageClick(currentPage + 1)}
                    />
                  </PButton>
                </Pagination>
              </div>
            </>
          )}
        </S.Container>
      </Layout>
    </>
  );
};

export default AdminManage;
const EditIcon = styled(FaPenToSquare)`
  font-size: 20px;
  transition: color 0.15s ease;
  color: ${getStyledColor("cool_gray", 700)};
  &:hover {
    color: ${getStyledColor("blue", 900)};
  }
  &:active {
    color: ${getStyledColor("blue", 1000)};
  }
  margin-right: 20px;
  cursor: pointer;
`;

const TrashIcon = styled(FaRegTrashCan)`
  font-size: 20px;
  transition: color 0.15s ease;
  color: ${getStyledColor("cool_gray", 700)};
  &:hover {
    color: ${getStyledColor("red", 900)};
  }
  &:active {
    color: ${getStyledColor("red", 1000)};
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
  border: 1px solid ${getStyledColor("blue", 400)};
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${getStyledColor("blue", 400)};
  }

  &:active {
    background-color: ${getStyledColor("blue", 500)};
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
`;
