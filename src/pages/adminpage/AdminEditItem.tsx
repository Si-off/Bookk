import React, { useEffect, ChangeEvent as ReactChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBookInfo from "../hooks/useBookInfo";
import { styled } from "styled-components";
import * as $ from "styles/AdminStyled";
import * as S from "styles/LoginStyled";
import { usePatchBook, useDeleteBook, useGetBook } from "queries";
import ImageUploader from "components/ImageUploader";
import Button from "components/Button";
const BASE_URL = process.env.REACT_APP_SERVER_URL;

const AdminEditItem = () => {
  const { bookInfo, setBookInfo, resetBookInfo } = useBookInfo();
  const { id } = useParams();
  const numericId = id ? parseInt(id, 10) : null;
  if (numericId === null || isNaN(numericId)) {
    return <div>유효하지 않은 ID입니다.</div>;
  }

  const navigate = useNavigate();
  const { data: book, isLoading } = useGetBook(numericId);
  const { mutate, status: patchStatus } = usePatchBook();
  const { mutate: remove, status: removeStatus } = useDeleteBook();
  // id를 숫자로 변환
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(book);
  if (!book) {
    return <div>책 정보를 찾을 수 없습니다.</div>;
  }
  useEffect(() => {
    if (book) {
      setBookInfo({
        title: book.title,
        content: book.content,
        images: [
          `${process.env.REACT_APP_SERVER_URL + book.images[0]?.path}`,
        ] || [book.images[0].fbPath[0]],
      });
    }
  }, [book, setBookInfo]);
  const handleChange = (e: ReactChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setBookInfo((prev) => ({ ...prev, title: value }));
        break;
      case "content":
        setBookInfo((prev) => ({ ...prev, content: value }));
        break;

      default:
        break;
    }
  };
  const handlePatch = () => {
    mutate({ ...bookInfo, id: numericId });
  };

  const handleRemove = () => {
    remove(numericId);
    navigate(`/admin`);
  };

  return (
    <Layout>
      <$.Container>
        <S.Wrapper>
          <S.InputField>
            <S.Label>도서명</S.Label>
            <S.Input
              name="title"
              placeholder="Title"
              value={bookInfo.title}
              onChange={handleChange}
            />
          </S.InputField>
          <S.InputField $marginTop={20}>
            <S.Label>설명</S.Label>
            <S.Input
              name="content"
              placeholder="content"
              value={bookInfo.content}
              onChange={handleChange}
            />
          </S.InputField>
        </S.Wrapper>
        <S.InputField $marginTop={20}>
          <S.Label>이미지</S.Label>
          {bookInfo.images && (
            <ImageUploader
              src={
                `${process.env.REACT_APP_SERVER_URL + book.images[0]?.path}` ||
                book?.images[0]?.fbPath[0]
              }
              onChange={(fileData) =>
                setBookInfo((prev) => ({
                  ...prev,
                  images: fileData ? [fileData] : [],
                }))
              }
            />
          )}
        </S.InputField>
        <S.InputField style={{ display: "flex", marginTop: 30, gap: 20 }}>
          <Button onClick={handlePatch} status={patchStatus}>
            수정
          </Button>
          <Button onClick={handleRemove} color="red">
            삭제
          </Button>
        </S.InputField>
      </$.Container>
    </Layout>
  );
};

export default AdminEditItem;
const Layout = styled.div`
  min-width: 1200px;
  padding: 45px;
  overflow-x: scroll;
`;
