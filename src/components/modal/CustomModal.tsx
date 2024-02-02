import { useRef } from 'react';
import * as S from 'styles/ModalStyled';
import { useDeleteBookLike, useGetBookIsLike, useGetComments, usePostBookLike } from 'queries';

import useOnclickOutside from 'hooks/useOnclickOutside';
import { BookInfoType, UserType, BookisLikeRes } from 'types';
import CommentWrite from 'components/modal/CommentWrite';
import CommentToggle from 'components/modal/CommentToggle';
import { IoIosClose } from 'react-icons/io';
import { useUserStore } from 'store/useUserStore';
import { FaHeart } from 'react-icons/fa';
import { QueryKeys } from 'constant';
import { useQueryClient } from '@tanstack/react-query';
import NotFoundComment from 'components/shared/NotFoundComment';
import { Loader } from 'components/shared';

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
  const ref = useRef<HTMLDivElement>(null);
  useOnclickOutside(ref, () => {
    setModalOpen(false);
    showScroll();
  });
  if (!bookId) return <div>loading...</div>;
  const { isLogin } = useUserStore();
  const user = useQueryClient().getQueryData<UserType>([QueryKeys.USER_DATA]);

  const { data: comments, status: commentStatus } = useGetComments(bookId || 0);
  const { data: bookIsLikeData, status, refetch } = useGetBookIsLike(bookId, user?.id || 0);
  const { mutate: postLike, status: postLikeStatus } = usePostBookLike({
    bookId: bookId,
  });
  const { mutate: deleteLike, status: deleteLikeStatus } = useDeleteBookLike({ bookId: bookId });

  function formatDate(timestamp: string) {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
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

  const toggleLike = () => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      return;
    }
    const onSuccessLike = () => {
      refetch();
    };
    if (bookIsLikeData?.isLike === false) {
      postLike(bookId, {
        onSettled: onSuccessLike,
      });
    } else {
      deleteLike(
        { bookId, likeId: bookIsLikeData?.likeId },
        {
          onSettled: onSuccessLike,
        },
      );
    }
  };

  if (status === 'error') return <div>error...</div>;
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
              {' '}
              <div>
                <S.ModalPosterImg src={`${book.images[0].fbPath[0]}`} alt="modal-img" />
                <S.HeartButton
                  onClick={() => {
                    toggleLike();
                  }}
                  $liked={bookIsLikeData?.isLike}
                  $status={status}
                  disabled={
                    postLikeStatus === 'loading' ||
                    deleteLikeStatus === 'loading' ||
                    status === 'loading'
                  }
                >
                  <FaHeart />
                </S.HeartButton>
              </div>
              <S.ModalContent>
                <S.ModalTitle>{book?.title}</S.ModalTitle>
                <S.ModalOverview>클릭수: {book?.clicks}</S.ModalOverview>
                <S.ModalOverview>
                  좋아요: {bookIsLikeData?.likeCount ? bookIsLikeData?.likeCount : book?.likeCount}
                </S.ModalOverview>
                <S.ModalOverview>작성자: {book?.author.name}</S.ModalOverview>
                <S.ModalDetails>
                  등록날짜: {'  '}
                  {book && formatDate(book.createdAt)}
                </S.ModalDetails>
                <S.ModalSubject>책 소개</S.ModalSubject>
                <S.ModalIntroduce>{book?.content}</S.ModalIntroduce>
                <S.CommentContainer>
                  <S.ModalSubject>한줄리뷰</S.ModalSubject>
                  {commentStatus === 'loading' ? (
                    <Loader custom={true} />
                  ) : (comments?.data ?? []).length > 0 ? (
                    <CommentToggle comments={comments} bookId={book?.id} />
                  ) : (
                    <NotFoundComment />
                  )}
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
