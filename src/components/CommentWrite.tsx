import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import Button from "components/Button";
import { getStyledColor } from "utils";
import { StyledLoader } from "styles/LoginStyled";
import { usePostComment } from "queries";

interface CommentWriteProps {
  bookId: number | undefined;
}

const CommentWrite: React.FC<CommentWriteProps> = ({ bookId }) => {
  if (bookId === undefined) return null;

  const [comment, setComment] = useState<string>("");
  const { mutate, status } = usePostComment(bookId);
  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    console.log(comment);
  };
  const onHandleClick = async () => {
    if (!comment) {
      alert("댓글을 입력해주세요.");
      return;
    }
    mutate(comment);
    setComment("");
  };

  return (
    <S.container>
      {status === "loading" ? (
        <StyledLoader />
      ) : (
        <S.textArea
          placeholder="댓글을 작성하세요!"
          name="reply5"
          value={comment}
          onChange={onChangeComment}
        />
      )}
      {status === "error" && <div>{"에러가 발생했습니다."}</div>}
      <S.buttonContainer>
        <Button onClick={onHandleClick} color={"gray"} status={status}>
          댓글등록
        </Button>
      </S.buttonContainer>
    </S.container>
  );
};

export default CommentWrite;

const S = {
  container: styled.div`
    background-color: ${getStyledColor("cool_gray", 800)};
    border-radius: 4px;
    padding: 10px 20px;
    box-shadow: 1px 1px 4px 2px ${getStyledColor("cool_gray", 500)};
  `,
  textArea: styled.textarea`
    width: 100%;
    min-height: 100px;
    resize: none;
    border: 1px solid ${getStyledColor("cool_gray", 500)};
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 5px;
  `,
  buttonContainer: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};