import { useRef, useState } from "react";
import * as S from "styles/ModalStyled";
import { useGetBook, useGetComments } from "queries";
import useOnclickOutside from "pages/hooks/useOnclickOutside";
import { BookInfoType } from "types";
import CommentWrite from "components/CommentWrite";
import CommentToggle from "components/CommentToggle";
import { IoIosClose } from "react-icons/io";
import { useUserStore } from "store/useUserStore";

export const CustomModal = ({
  bookId,
  book,
  setModalOpen,
  showScroll,
}: {
  bookId: number | null;
  book: BookInfoType | undefined;
  setModalOpen: (open: boolean) => void;
  showScroll: () => void;
}) => {
  const ref = useRef(null);
  useOnclickOutside(ref, () => {
    setModalOpen(false);
    showScroll();
  });

  const { isLogin } = useUserStore();
  const { data: comments, status: commentStatus } = useGetComments(bookId || 0);
  function formatDate(timestamp: string) {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 바깥을 클릭하면 모달을 닫음
    if (e.target === e.currentTarget) {
      setModalOpen(false);
      showScroll(); // 필요에 따라 모달이 닫힐 때 실행할 추가 작업을 수행할 수 있습니다.
    }
  };

  if (status === "error") return <div>error...</div>;
  return (
    <S.Presentation>
      <S.WrapperModal onClick={handleOutsideClick}>
        <S.Modal>
          <S.ModalClose
            onClick={() => {
              setModalOpen(false);
              showScroll();
            }}
          >
            <IoIosClose />
          </S.ModalClose>

          {book?.images[0] && (
            <S.ModalPosterContainer>
              {" "}
              <S.ModalPosterImg
                src={`${book.images[0].fbPath[0]}`}
                alt="modal-img"
              />
              <S.ModalContent>
                <S.ModalTitle>{book?.title}</S.ModalTitle>
                <S.ModalOverview>클릭수: {book?.clicks}</S.ModalOverview>
                <S.ModalOverview>좋아요: {book?.likeCount}</S.ModalOverview>
                <S.ModalOverview>작성자: {book?.author.name}</S.ModalOverview>
                <S.ModalDetails>
                  등록날짜: {"  "}
                  {book && formatDate(book.createdAt)}
                </S.ModalDetails>
                <S.ModalSubject>책 소개</S.ModalSubject>
                <S.ModalIntroduce>{book?.content}</S.ModalIntroduce>
                <S.CommentContainer>
                  <S.ModalSubject>한줄리뷰</S.ModalSubject>
                  <CommentToggle comments={comments} bookId={book?.id} />
                  <CommentWrite bookId={book?.id} />
                </S.CommentContainer>
              </S.ModalContent>
            </S.ModalPosterContainer>
          )}
        </S.Modal>
      </S.WrapperModal>
    </S.Presentation>
  );
};

export default CustomModal;
