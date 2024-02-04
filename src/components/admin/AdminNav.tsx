import { memo } from 'react';
import { FaHome, FaBook, FaListAlt, FaAddressBook, FaCommentDots } from 'react-icons/fa';
import { FaChalkboardUser, FaCircleUser } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { pixelToRem, getStyledColor } from 'utils';

const tabs = [
  {
    id: 1,
    to: '',
    name: '메인',
    icon: <FaHome />,
  },
  {
    id: 2,
    to: '/',
    name: '유저 페이지',
    icon: <FaChalkboardUser />,
  },
  {
    id: 3,
    to: '/mypage',
    name: '내 프로필',
    icon: <FaCircleUser />,
  },
  {
    id: 4,
    to: '',
    name: 'divider',
    icon: null,
  },
  {
    id: 5,
    to: 'create',
    name: '책 등록',
    icon: <FaBook />,
  },
  {
    id: 6,
    to: 'books',
    name: '책 관리',
    icon: <FaListAlt />,
  },
  {
    id: 7,
    to: 'users',
    name: '사용자 관리',
    icon: <FaAddressBook />,
  },
  {
    id: 8,
    to: 'reviews',
    name: '댓글 관리',
    icon: <FaCommentDots />,
  },
] as const;

const AdminNav = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2] || '';

  return (
    <Nav>
      <Title>Bookk</Title>
      <ul>
        {tabs.map((tab) => {
          if (tab.name === 'divider') return <Divider key={4} />;
          return (
            <Item key={tab.id} $selected={tab.to === path}>
              <StyledLink to={tab.to} $selected={tab.to === path}>
                {tab.icon}
                {tab.name}
              </StyledLink>
            </Item>
          );
        })}
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

const Divider = styled.div`
  height: 1px;
  background-color: ${getStyledColor('cool_gray', 400)};
  margin: 12px 0;
`;
