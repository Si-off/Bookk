import React, { useState } from "react";
import styled from "styled-components";
import { getStyledColor, pixelToRem } from "utils";

const DropdownObject: { [key: string]: string } = {
  DESC: "최신순",
  ASC: "오래된순",
};

interface DropdownProps {
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<"DESC" | "ASC">>;
}

const Dropdown: React.FC<DropdownProps> = ({ order, setOrder }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>("최신순");
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setOrder(item === "최신순" ? "DESC" : "ASC");
    setIsOpen(false);
  };

  return (
    <S.Wrapper>
      <S.container>
        <button onClick={toggleDropdown}>
          {selectedItem ? selectedItem : "최신순"}
        </button>

        {isOpen && (
          <ul>
            {Object.keys(DropdownObject).map((key) => (
              <S.item
                key={key}
                onClick={() => handleItemClick(DropdownObject[key])}
              >
                {DropdownObject[key]}
              </S.item>
            ))}
          </ul>
        )}
      </S.container>
    </S.Wrapper>
  );
};

export default Dropdown;

const S = {
  Wrapper: styled.div`
    position: absolute;
    top: 100px;
    right: 50px;
    height: 50px;
    width: 100px;
    border-radius: 10px;
  `,
  container: styled.div`
    position: relative;
    display: flex;
    width: 100px;
    height: 50px;
    display: flex;
    border-radius: 10px;
    justify-content: center;
    & > button {
      background-color: #018786;
      color: white;
      padding: 16px;
      font-size: 16px;
      border: none;
      cursor: pointer;
      border-radius: 10px;
    }
    & > ul {
      position: absolute;
      top: 60px;
      width: 100px;
      background-color: ${getStyledColor("gray", 500)};
      list-style-type: none;
      padding: 0;
      margin: 0 auto;
      z-index: 10;
      display: flex;
      justify-content: center;
      flex-direction: column;
      border-radius: 10px;
    }
  `,
  item: styled.li`
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    width: 100%;
    margin: 0 auto;
    &:hover {
      background-color: #018786;
    }
  `,
};
