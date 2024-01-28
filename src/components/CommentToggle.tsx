import { useGetComments } from "queries";
import React from "react";
import styled from "styled-components";
import * as S from "styles/CommentStyled";
import { useUserStore } from "store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "constant";
import { CommentGetRes } from "types";
interface CommentToggleProps {
  comments: CommentGetRes | undefined;
  bookId: number | undefined;
}
const CommentToggle = ({ comments, bookId }: CommentToggleProps) => {
  if (bookId === undefined) return null;
  const user = useQueryClient().getQueryData([QueryKeys.LOGIN]);
  console.log(user, "user");
  function formatDate(timestamp: string) {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }
  return (
    <S.CommentContainer>
      {comments?.data?.map((reply: any, index: any) => {
        return (
          <S.CommentItemContainer key={reply.id} $index={index}>
            <div>
              <span style={{ fontSize: "14px" }}>{reply.author.nickname}</span>
              <div style={{ fontSize: "10px" }}>
                {formatDate(reply.createdAt)}
              </div>
              <span>
                <div style={{ marginTop: "6px" }}>{reply.reply2}</div>
              </span>
            </div>

            {/* {user?.nickname === reply?.author?.nickname && (
                <S.CommentButtonContainer>
                  <S.CommentButton>수정</S.CommentButton>
                  <S.CommentButton>삭제</S.CommentButton>
                </S.CommentButtonContainer>
              )} */}
          </S.CommentItemContainer>
        );
      })}
    </S.CommentContainer>
  );
};

export default CommentToggle;

const Toggle = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
