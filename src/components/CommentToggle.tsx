import { useGetComments } from 'queries';
import React from 'react';
import styled from 'styled-components';
import { StyledLoader } from 'styles/LoginStyled';
import * as S from 'styles/CommentStyled';
import { useUserStore } from 'store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
interface CommentToggleProps {
  toggleModal: () => void;
  isOpen: boolean;
  bookId: number | undefined;
}
const CommentToggle = ({ toggleModal, isOpen, bookId }: CommentToggleProps) => {
  if (bookId === undefined) return null;
  const { data: comments, status } = useGetComments(bookId);
  // const user = useUserStore((state) => state.user);
  const user = useQueryClient().getQueryData([QueryKeys.LOGIN]);
  console.log(user);

  // console.log(user);
  if (status === 'loading') return <StyledLoader />;
  if (status === 'error') return <div>error</div>;
  return (
    <Toggle isOpen={isOpen}>
      <S.CommentContainer>
        {comments?.data?.map((reply: any, index: any) => {
          return (
            <S.CommentItemContainer key={reply.id} $index={index}>
              <div>
                <span>작성자:{reply.author.nickname}</span>
                <span>
                  <div>{reply.reply2}</div>
                </span>
              </div>

              <S.CommentItemRight>
                <span>{reply.createdAt}</span>
                {/* {user?.nickname === reply?.author?.nickname && (
                <S.CommentButtonContainer>
                  <S.CommentButton>수정</S.CommentButton>
                  <S.CommentButton>삭제</S.CommentButton>
                </S.CommentButtonContainer>
              )} */}
              </S.CommentItemRight>
            </S.CommentItemContainer>
          );
        })}
      </S.CommentContainer>
      <button onClick={toggleModal}>toggle</button>
    </Toggle>
  );
};

export default CommentToggle;

const Toggle = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
