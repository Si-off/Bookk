import { get } from "http";
import { styled } from "styled-components";
import { getStyledColor, pixelToRem } from "utils";
interface InputFieldProps {
  $marginTop?: number;
}

export const Title = styled.h2`
  font-size: ${pixelToRem(32)};
  font-weight: 700;
`;

export const SubTitle = styled.h3`
  font-size: ${pixelToRem(16)};
  font-weight: 500;
  margin-bottom: 16px;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 24px 35px;
  box-shadow: 0px 1px 4px 0px ${getStyledColor("cool_gray", 300)};
`;

export const Header = styled.header`
  margin-bottom: 40px;
`;

// TABLE
export const Table = styled.table`
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
`;
export const Theader = styled.thead`
  font-weight: 700;
  background-color: ${getStyledColor("blue", 500)};
`;
export const Tbody = styled.tbody``;
export const Tcolumn = styled.th`
  font-size: ${pixelToRem(16)};
  text-align: center;
  padding: 20px 25px;
`;
export const Trow = styled.tr`
  td {
    background-color: ${getStyledColor("gray", 100)};
  }
  &:nth-child(2n + 1) td {
    background-color: ${getStyledColor("gray", 300)};
  }
`;
export const Tcell = styled.td`
  font-size: ${pixelToRem(14)};
  text-align: center;
  padding: 10px 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
//

export const Label = styled.label`
  font-weight: 300;
`;

export const InputField = styled.div<InputFieldProps>`
  width: 100%;
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop + "px" : "")};
  display: flex;
  flex-direction: column;

  input {
    margin-top: 10px;
  }
`;

export const Input = styled.input`
  width: ${pixelToRem(300)};
  padding: 15px 20px;
  background-color: ${getStyledColor("gray", 300)};
  color: ${getStyledColor("gray", 800)};
  border: none;
  border-radius: 8px;

  &:focus {
    outline: 1px solid ${getStyledColor("blue", 500)};
  }
`;
