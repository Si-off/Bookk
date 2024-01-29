import useOnclickOutside from 'hooks/useOnclickOutside';
import React, { useCallback, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getStyledColor, pixelToRem } from 'utils';

const DropdownObject: { [key: string]: string } = {
  DESC: '최신순',
  ASC: '오래된순',
};

interface DropdownProps {
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<'DESC' | 'ASC'>>;
}

const Dropdown: React.FC<DropdownProps> = ({ order, setOrder }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>('최신순');
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useOnclickOutside(ref, handleOutsideClick);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setOrder(item === '최신순' ? 'DESC' : 'ASC');
    setIsOpen(false);
  };

  return (
    <S.Container ref={ref}>
      <S.Wrapper>
        <S.Button onClick={toggleDropdown}>{selectedItem ? selectedItem : '최신순'}</S.Button>
        {isOpen && (
          <S.List>
            {Object.keys(DropdownObject).map((key) => (
              <S.Item key={key} onClick={() => handleItemClick(DropdownObject[key])}>
                {DropdownObject[key]}
              </S.Item>
            ))}
          </S.List>
        )}
      </S.Wrapper>
    </S.Container>
  );
};

export default Dropdown;

const Show = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const S = {
  Container: styled.div`
    position: absolute;
    top: 15%;
    right: 2%;
    z-index: 1;
  `,
  Wrapper: styled.div`
    position: relative;
  `,
  Button: styled.button`
    position: relative;
    width: ${pixelToRem(100)};
    padding: 14px 20px;
    border-radius: 4px;
    background-color: ${getStyledColor('white', 'high')};
    font-weight: 700;

    transition: background-color 0.2s ease, color 0.2s ease;

    &:focus {
      color: ${getStyledColor('white', 'high')};
      background-color: ${getStyledColor('primary', 600)};
    }
  `,
  List: styled.ul`
    position: absolute;
    top: 50px;
    left: calc(50% - 50px);
    background-color: ${getStyledColor('white', 'medium')};
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 4px;
    animation: ${Show} 0.3s ease forwards;
  `,
  Item: styled.li`
    width: ${pixelToRem(100)};
    padding: 14px 20px;
    text-align: center;
    transition: background-color 0.07s ease, color 0.07s ease;
    cursor: pointer;
    &:hover {
      color: ${getStyledColor('white', 'high')};
      background-color: ${getStyledColor('primary', 800)};
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    &:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  `,
};
