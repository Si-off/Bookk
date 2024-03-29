import { CommentGetRes, CommentType, UserType } from 'types';
import styled from 'styled-components';
import * as S from 'styles/CommentStyled';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { useDeleteComment, usePatchComment } from 'queries';
import { Button } from 'components/shared';
import { getDateStr } from 'utils';

interface CommentToggleProps {
  comments: CommentGetRes | undefined;
  bookId: number;
}

const CommentToggle = ({ comments, bookId }: CommentToggleProps) => {
  const user = useQueryClient().getQueryData<UserType>([QueryKeys.USER_DATA]);
  const { mutate: deleteComment, status: deleteStatus } = useDeleteComment(bookId);
  const { mutate: patchComment, status: patchStatus } = usePatchComment(bookId);
  const handleChangeClick = (commentId: number, oldComment: string) => {
    const newComment = prompt('댓글을 수정하세요', oldComment);
    if (!newComment || newComment === oldComment) return;
    patchComment({ bookId, commentId, comment: newComment });
  };
  const handleDeleteClick = (commentId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteComment(commentId);
    } else {
      return;
    }
  };

  return (
    <S.CommentContainer>
      {comments?.data?.map((reply: CommentType, index: number) => {
        return (
          <S.CommentItemContainer key={reply.id} $index={index}>
            <div>
              <S.CommentInfo>
                <span>{reply.author.nickname}</span>
                <span>{getDateStr(reply.createdAt)}</span>
              </S.CommentInfo>

              <S.Hr />
              <span>
                <div style={{ marginTop: '6px' }}>{reply.reply2}</div>
              </span>
            </div>

            {user?.id === reply?.author?.id && (
              <S.CommentButtonContainer>
                <Button
                  onClick={() => handleChangeClick(reply.id, reply.reply2)}
                  disabled={patchStatus === 'loading' || deleteStatus === 'loading'}
                >
                  수정
                </Button>
                <Button
                  onClick={() => handleDeleteClick(reply.id)}
                  disabled={patchStatus === 'loading' || deleteStatus === 'loading'}
                >
                  삭제
                </Button>
              </S.CommentButtonContainer>
            )}
          </S.CommentItemContainer>
        );
      })}
    </S.CommentContainer>
  );
};

export default CommentToggle;

const Toggle = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
