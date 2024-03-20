import styled from 'styled-components';
import { getStyledColor } from 'utils';

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
  border-radius: 4px;
  padding: 20px 20px;
`;

interface CommentItemContainerProps {
  $index: number;
}

export const CommentItemContainer = styled.div<CommentItemContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 15px 15px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid ${getStyledColor('cool_gray', 500)};
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

export const CommentButton = styled.button<{ onClick: (commentId: number) => void }>`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${getStyledColor('purple', 300)};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${getStyledColor('blue', 400)};
  }
`;

export const CommentInfo = styled.div`
  font-size: 16px;
  color: #666;
  display: flex;
  justify-content: space-between;
`;
export const Hr = styled.hr`
  margin: 10px 0;
`;
