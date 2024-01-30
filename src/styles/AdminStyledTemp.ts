import styled, { css } from 'styled-components';
import { getStyledColor, pixelToRem } from 'utils';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div<{ $hidden?: boolean }>`
  border-radius: 4px;
  background-color: #fff;
  padding: 20px 25px;

  ${({ $hidden }) =>
    $hidden &&
    css`
      visibility: 'hidden';
    `}
`;

export const ContainerHeader = styled.div`
  min-height: ${pixelToRem(80)};
`;

export const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: ${pixelToRem(24)};
  font-weight: 700;
`;

type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export const Button = styled.button<{
  $variant?: Variant;
  color?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${pixelToRem(70)};
  min-height: ${pixelToRem(35)};
  padding: 0px 12px;
  border-radius: 4px;
  font-weight: 500;

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          color: ${getStyledColor('white', 'high')};
          background-color: ${getStyledColor('teal', 1000)};
        `;
      case 'secondary':
        return css`
          color: ${getStyledColor('teal', 1000)};
          background-color: ${getStyledColor('teal', 100)};
        `;
      case 'success':
        return css`
          color: ${getStyledColor('white', 'high')};
          background-color: ${getStyledColor('forest', 800)};
        `;
      case 'warning':
        return css`
          color: ${getStyledColor('white', 'high')};
          background-color: ${getStyledColor('orange', 800)};
        `;
      case 'error':
        return css`
          color: ${getStyledColor('white', 'high')};
          background-color: ${getStyledColor('red', 800)};
        `;
      default:
        return css`
          color: ${getStyledColor('black', 800)};
          background-color: ${getStyledColor('white', 'high')};
          border: 1px solid ${getStyledColor('black', 800)};
        `;
    }
  }};
`;

export const Wrapper = styled.div<{ $marginTop?: number; $gap?: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $gap }) => ($gap ? $gap + 'px' : '')};
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop + 'px' : '')};
`;

export const Label = styled.label`
  font-weight: 400;
  color: ${getStyledColor('gray', 900)};
  margin-bottom: 5px;
`;

export const InputField = styled.div<{ $marginTop?: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop + 'px' : '')};

  input {
    margin-top: 10px;
  }
`;

export const Input = styled.input`
  width: 100%;
  max-width: ${pixelToRem(500)};
  padding: 15px 20px;
  background-color: ${getStyledColor('gray', 500)};
  color: ${getStyledColor('gray', 1200)};
  border: 3px solid rgba(0, 0, 0, 0);
  border-radius: 2px;
  transition: border 0.2s ease;
  margin: 0;

  &:focus {
    border: 3px solid ${getStyledColor('teal', 600)};
  }

  &::placeholder {
    color: ${getStyledColor('gray', 900)};
  }
`;

export const Textarea = styled.textarea`
  width: 500px;
  max-width: ${pixelToRem(500)};
  min-height: 200px;
  padding: 15px 20px;
  background-color: ${getStyledColor('gray', 500)};
  color: ${getStyledColor('gray', 1200)};
  border: 3px solid rgba(0, 0, 0, 0);
  border-radius: 20px;
  resize: none;
  outline: none;

  &:focus {
    border: 3px solid ${getStyledColor('teal', 600)};
  }

  &::placeholder {
    color: ${getStyledColor('gray', 900)};
  }
`;

export const Table = styled.table`
  border-radius: 4px;
  overflow: hidden;
  border-collapse: collapse;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
`;
export const Theader = styled.thead`
  font-weight: 700;
  background-color: ${getStyledColor('teal', 900)};
  color: ${getStyledColor('white', 'high')};
`;
export const Tbody = styled.tbody``;
export const Tcolumn = styled.th`
  font-size: ${pixelToRem(16)};
  text-align: center;
  padding: 10px 15px;
`;
export const Trow = styled.tr`
  max-height: 50px;
  td {
    background-color: ${getStyledColor('gray', 100)};
  }
  &:nth-child(2n + 1) td {
    background-color: ${getStyledColor('gray', 300)};
  }
`;
export const Tcell = styled.td`
  max-height: 50px;
  font-size: ${pixelToRem(14)};
  text-align: center;
  padding: 10px 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  & button {
    background-color: inherit;
  }
`;
