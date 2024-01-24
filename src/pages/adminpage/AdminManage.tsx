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
import { useGetBooks, useDeleteBook } from "queries";
import { getStyledColor } from "utils";
import { useSelectedBook } from "store/useSelectedBooks";
import { getDateStr } from "utils";
import { BookInfoType } from "types";
const AdminManage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: books, status } = useGetBooks({ take: 10, page: currentPage });
  const { setSelectedBook } = useSelectedBook();
  const { mutate: remove } = useDeleteBook();
  const navigate = useNavigate();

  const user = useUserStore((state: any) => state.user);
  console.log("user", user);

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
    <Layout>
      <S.Container>
        {!books ? (
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
                        <S.Tcell>{title}</S.Tcell>
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
            <div>
              <Pagination>
                <button>
                  <PLeft onClick={() => handlePageClick(currentPage - 1)} />
                </button>
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
                <button>
                  <PRight onClick={() => handlePageClick(currentPage + 1)} />
                </button>
              </Pagination>
            </div>
          </>
        )}
      </S.Container>
    </Layout>
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
  gap: 2px;
`;

const PNumber = styled.button`
  padding: 8px;
`;

const PLeft = styled(FaAngleLeft)`
  display: inline-flex;
  align-items: center;
`;
const PRight = styled(FaAngleRight)`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
`;

const Layout = styled.div`
  min-width: 1200px;
  padding: 45px;
  overflow-x: scroll;
`;
