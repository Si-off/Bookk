import { CommentGetRes, CommentType, UserType } from 'types';
import styled from 'styled-components';
import * as S from 'styles/CommentStyled';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { useDeleteComment, usePatchComment } from 'queries';
import { Button } from 'components/shared';

interface CommentToggleProps {
  comments: CommentGetRes | undefined;
  bookId: number;
}

const CommentToggle = ({ comments, bookId }: CommentToggleProps) => {
  const user = useQueryClient().getQueryData<UserType>([QueryKeys.USER_DATA]);
  // const [comment, setComment] = useState<string>();
  const { mutate: deleteComment, status: deleteStatus } = useDeleteComment(bookId);
  const { mutate: patchComment, status: patchStatus } = usePatchComment(bookId);
  const handleChangeClick = (commentId: number) => {
    const newComment = prompt('댓글을 수정하세요');
    if (!newComment) return;
    patchComment({ bookId, commentId, comment: newComment });
  };
  const handleDeleteClick = (commentId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteComment(commentId);
    } else {
      return;
    }
  };
  function formatDate(timestamp: string) {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }

  return (
    <S.CommentContainer>
      {comments?.data?.map((reply: CommentType, index: number) => {
        return (
          <S.CommentItemContainer key={reply.id} $index={index}>
            <div>
              <span style={{ fontSize: '14px' }}>{reply.author.nickname}</span>
              <div style={{ fontSize: '10px' }}>{formatDate(reply.createdAt)}</div>
              <span>
                <div style={{ marginTop: '6px' }}>{reply.reply2}</div>
              </span>
            </div>

            {user?.id === reply?.author?.id && (
              <S.CommentButtonContainer>
                <Button
                  onClick={() => handleChangeClick(reply.id)}
                  status={patchStatus}
                  disabled={patchStatus === 'loading' || deleteStatus === 'loading'}
                >
                  수정
                </Button>
                <Button
                  onClick={() => handleDeleteClick(reply.id)}
                  status={deleteStatus}
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
