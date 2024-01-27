import { useRef, useState } from 'react';
import * as S from 'styles/ModalStyled';
import styled from 'styled-components';
import { useGetBook } from 'queries';
import useOnclickOutside from 'pages/hooks/useOnclickOutside';
import { StyledLoader } from 'styles/LoginStyled';
import CommentWrite from 'components/CommentWrite';
import CommentToggle from 'components/CommentToggle';
export const CustomModal = ({
  bookId,
  setModalOpen,
  showScroll,
}: {
  bookId: number | null;
  setModalOpen: (open: boolean) => void;
  showScroll: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useOnclickOutside(ref, () => {
    setModalOpen(false);
    showScroll();
  });
  const { data: book, status } = useGetBook(bookId || 0);

  function formatDate(timestamp: string) {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  if (status === 'loading')
    return (
      <LoaderContainer>
        <StyledLoader />
      </LoaderContainer>
    );
  if (status === 'error') return <div>error...</div>;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <S.Presentation role='presentation'>
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
            <S.ModalPosterContainer>
              {' '}
              <S.ModalPosterImg
                src={book?.images[0].fbPath[0]}
                alt='modal-img'
              />
            </S.ModalPosterContainer>
          )}
          <S.ModalContent>
            <S.ModalDetails>
              등록날짜:{book && formatDate(book.createdAt)}
            </S.ModalDetails>
            <S.ModalTitle>{book?.title}</S.ModalTitle>
            <S.ModalOverview>클릭수: {book?.clicks}</S.ModalOverview>
            <S.ModalOverview>좋아요: {book?.likeCount}</S.ModalOverview>
            <S.ModalOverview>작성자: {book?.author.name}</S.ModalOverview>
            <S.ModalOverview>{book?.content}</S.ModalOverview>
            <S.CommentContainer>
              <button onClick={toggleModal}>댓글 보기</button>
              <CommentToggle
                toggleModal={toggleModal}
                isOpen={isOpen}
                bookId={book?.id}
              />

              <CommentWrite bookId={book?.id} />
            </S.CommentContainer>
          </S.ModalContent>
        </S.Modal>
      </S.WrapperModal>
    </S.Presentation>
  );
};

export default CustomModal;

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`;
