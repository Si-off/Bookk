import { memo, useState } from 'react';
import { FaHome, FaBook, FaListAlt, FaAddressBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { pixelToRem, getStyledColor } from 'utils';

const tabs = [
  {
    to: '',
    name: '메인',
    icon: <FaHome />,
  },
  {
    to: 'create',
    name: '책 등록',
    icon: <FaBook />,
  },
  {
    to: 'manage/books',
    name: '책 관리',
    icon: <FaListAlt />,
  },
  {
    to: 'manage/users',
    name: '사용자 관리',
    icon: <FaAddressBook />,
  },
] as const;

const AdminNav = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Nav>
      <Title>BOOKK</Title>
      <ul>
        {tabs.map((tab, index) => (
          <Item key={index} $selected={index === selectedTab}>
            <StyledLink
              to={tab.to}
              $selected={index === selectedTab}
              onClick={() => setSelectedTab(index)}
            >
              {tab.icon}
              {tab.name}
            </StyledLink>
          </Item>
        ))}
      </ul>
    </Nav>
  );
};

export default memo(AdminNav);

const Title = styled.h1`
  font-size: 26px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
`;

const Nav = styled.nav`
  min-width: ${pixelToRem(200)};
  background-color: #fff;
  padding: 20px 20px 20px 0px;

  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const Item = styled.li<{ $selected: boolean }>`
  border-radius: 4px;
  ${({ $selected }) =>
    $selected
      ? css`
          font-weight: 500;
          color: ${getStyledColor('teal', 900)};
          background-color: ${getStyledColor('teal', 400)};
          &:hover {
            color: ${getStyledColor('teal', 900)};
            background-color: ${getStyledColor('teal', 500)};
          }
          &:active {
            color: ${getStyledColor('teal', 900)};
            background-color: ${getStyledColor('teal', 600)};
          }
        `
      : css`
          color: ${getStyledColor('cool_gray', 900)};
          &:hover {
            color: ${getStyledColor('cool_gray', 900)};
            background-color: ${getStyledColor('cool_gray', 200)};
          }
          &:active {
            background-color: ${getStyledColor('cool_gray', 300)};
          }
        `};
`;

const StyledLink = styled(Link)<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
  color: ${getStyledColor('teal', 900)};
  font-weight: 500;
  margin-left: 30px;

  ${({ $selected }) =>
    $selected
      ? css`
          font-weight: 500;
          color: ${getStyledColor('teal', 900)};
          background-color: ${getStyledColor('teal', 400)};
          &:hover {
            color: ${getStyledColor('teal', 900)};
            background-color: ${getStyledColor('teal', 500)};
          }
          &:active {
            color: ${getStyledColor('teal', 900)};
            background-color: ${getStyledColor('teal', 600)};
          }
        `
      : css`
          color: ${getStyledColor('cool_gray', 900)};
          &:hover {
            color: ${getStyledColor('cool_gray', 900)};
            background-color: ${getStyledColor('cool_gray', 200)};
          }
          &:active {
            background-color: ${getStyledColor('cool_gray', 300)};
          }
        `};
`;
