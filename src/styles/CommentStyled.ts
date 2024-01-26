import styled from "styled-components";
import { getStyledColor } from "utils";

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const TtileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 2rem;
  border-bottom: 2px solid #000;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  margin-right: 2rem;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: ${getStyledColor("red", 300)};
  border-radius: 4px;
  padding: 10px 20px;
  box-shadow: 1px 1px 4px 2px ${getStyledColor("cool_gray", 500)};
`;

interface CommentItemContainerProps {
  $index: number;
}

export const CommentItemContainer = styled.div<CommentItemContainerProps>`
  color: rgba(89, 80, 61, 1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 5px 5px;
  margin: 5px 0;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$index % 2 === 0 ? "rgba(182,187,193,0.9)" : "rgba(250,204,224,0.9)"};
`;

export const CommentItemRight = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

export const CommentButton = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${getStyledColor("purple", 300)};
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${getStyledColor("blue", 400)};
  }
`;
