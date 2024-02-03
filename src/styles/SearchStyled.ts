import { styled } from 'styled-components';

import { getStyledColor, pixelToRem } from 'utils';
export const WrapperSearch = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const Search = styled.div`
  z-index: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid ${getStyledColor('cool_gray', 400)};
  border-radius: 4px;
  padding: 0 10px;
  margin-right: 10px;
`;

export const SearchButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  color: ${getStyledColor('black', 500)};
  background-color: ${getStyledColor('green', 300)};
  font-size: ${pixelToRem(14)};
  font-weight: 700;
  margin-right: 10px;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    background-color: ${getStyledColor('green', 600)};
    color: ${getStyledColor('white', 'high')};
  }
  &:disabled {
    background-color: ${getStyledColor('cool_gray', 400)};
    color: ${getStyledColor('cool_gray', 200)};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
export const ResetButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  color: ${getStyledColor('black', 500)};
  background-color: ${getStyledColor('red', 500)};
  font-size: ${pixelToRem(14)};
  font-weight: 700;

  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    background-color: ${getStyledColor('red', 700)};
    color: ${getStyledColor('white', 'high')};
  }
  &:disabled {
    background-color: ${getStyledColor('cool_gray', 400)};
    color: ${getStyledColor('cool_gray', 200)};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
