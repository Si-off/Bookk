import { useRef, useState } from "react";
import * as S from "styles/ModalStyled";
import { BookRes } from "types";
import { useGetBook } from "queries";
import useOnclickOutside from "pages/hooks/useOnclickOutside";
export const CustomModal = ({
  bookId,
  setModalOpen,
  showScroll,
}: {
  bookId: number | null;
  setModalOpen: (open: boolean) => void;
  showScroll: () => void;
}) => {
  const ref = useRef(null);
  useOnclickOutside(ref, () => {
    setModalOpen(false);
    showScroll();
  });
  const { data: book, status } = useGetBook(bookId || 0);

  if (status === "loading") return <div>loading...</div>;
  if (status === "error") return <div>error...</div>;

  return (
    <S.Presentation role="presentation">
      <S.WrapperModal>
        <S.Modal ref={ref}>
          <S.ModalClose
            onClick={() => {
              setModalOpen(false);
              showScroll();
            }}
          >
            X
          </S.ModalClose>
          {book?.images[0]?.fbPath[0] && (
            <S.ModalPosterImg src={book?.images[0].fbPath[0]} alt="modal-img" />
          )}
          <S.ModalContent>
            <S.ModalDetails>등록날짜:{book?.createdAt}</S.ModalDetails>
            <S.ModalTitle>{book?.title}</S.ModalTitle>
            <S.ModalOverview>클릭수: {book?.clicks}</S.ModalOverview>
            <S.ModalOverview>좋아요: {book?.likeCount}</S.ModalOverview>
            <S.ModalOverview>작성자: {book?.author.name}</S.ModalOverview>
            <S.ModalOverview>{book?.content}</S.ModalOverview>
          </S.ModalContent>
        </S.Modal>
      </S.WrapperModal>
    </S.Presentation>
  );
};

export default CustomModal;
