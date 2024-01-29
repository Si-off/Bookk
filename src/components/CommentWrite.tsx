import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import { getStyledColor } from 'utils';

import { usePostComment } from 'queries';
import Loader from './Loader';
import { useUserStore } from 'store/useUserStore';

interface CommentWriteProps {
  bookId: number | undefined;
}

const CommentWrite: React.FC<CommentWriteProps> = ({ bookId }) => {
  if (bookId === undefined) return null;

  const { isLogin } = useUserStore();
  const [comment, setComment] = useState<string>('');
  const { mutate, status } = usePostComment(bookId);
  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const onHandleClick = async () => {
    if (!comment) {
      alert('댓글을 입력해주세요.');
      return;
    }
    mutate(comment);
    setComment('');
  };

  return (
    <S.container>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <S.textArea
          placeholder={isLogin ? '한줄리뷰를 작성하세요!' : '로그인 후 작성 가능합니다.'}
          name='reply5'
          value={comment}
          onChange={onChangeComment}
        />
      )}
      {status === 'error' && <div>{'에러가 발생했습니다.'}</div>}
      <S.buttonContainer>
        {isLogin && (
          <Button onClick={onHandleClick} color={'blue'} status={status}>
            댓글등록
          </Button>
        )}
      </S.buttonContainer>
    </S.container>
  );
};

export default CommentWrite;

const S = {
  container: styled.div`
    border-radius: 4px;
    padding: 10px 20px;
  `,
  textArea: styled.textarea`
    width: 100%;
    height: 70px;
    resize: none;
    border: 1px solid ${getStyledColor('cool_gray', 500)};
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 5px;
  `,
  buttonContainer: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};
