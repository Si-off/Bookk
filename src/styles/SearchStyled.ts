import { styled } from "styled-components";

import { getStyledColor, pixelToRem } from "utils";
export const Search = styled.div`
  position: absolute;
  top: 15%;
  left: 20%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
  & > span {
    margin-right: 10px;
  }
`;
export const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid ${getStyledColor("cool_gray", 400)};
  border-radius: 4px;
  padding: 0 10px;
  margin-right: 10px;
`;

export const SearchButton = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid ${getStyledColor("cool_gray", 400)};
  border-radius: 4px;
  background-color: ${getStyledColor("orange", 300)};
  font-size: ${pixelToRem(14)};
  font-weight: 700;
  &:hover {
    background-color: ${getStyledColor("orange", 600)};
    color: ${getStyledColor("orange", 400)};
  }
`;
export const ResetButton = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid ${getStyledColor("cool_gray", 400)};
  border-radius: 4px;
  background-color: ${getStyledColor("red", 500)};
  font-size: ${pixelToRem(14)};
  font-weight: 700;
  &:hover {
    background-color: ${getStyledColor("red", 600)};
    color: ${getStyledColor("red", 400)};
  }
`;
