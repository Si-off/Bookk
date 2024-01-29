import { memo, useState } from 'react';
import { FaHome, FaBook, FaListAlt } from 'react-icons/fa';
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
    to: 'manage',
    name: '책 관리',
    icon: <FaListAlt />,
  },
] as const;

const AdminNav = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <Nav>
      <ul>
        {tabs.map((tab, index) => (
          <Item $selected={index === selectedTab}>
            <StyledLink
              to={tab.to}
              key={index}
              $selected={index === selectedTab}
              onClick={() => setSelectedTab(index)}>
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

const Nav = styled.nav`
  min-width: ${pixelToRem(200)};
  background-color: #fff;
  padding: 20px 0 20px 20px;

  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const Item = styled.li<{ $selected: boolean }>`
  ${({ $selected }) =>
    $selected &&
    css`
      border-right: 3px solid ${getStyledColor('admin', 'primary')};

      &:hover {
        color: #9c89ff;
      }
      &:active {
        color: #2912a6;
      }
    `}
`;

const StyledLink = styled(Link)<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
  color: ${getStyledColor('admin', 'secondaryGray')};
  font-weight: 500;

  ${({ $selected }) =>
    $selected
      ? css`
          font-weight: 500;
          color: ${getStyledColor('admin', 'primary')};

          &:hover {
            color: #9c89ff;
          }
          &:active {
            color: #2912a6;
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
