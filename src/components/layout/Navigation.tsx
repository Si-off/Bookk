import React from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <NavigationWrapper>
      <Logo>
        <img
          onClick={() => {
            navigate('/user');
          }}
          src='img/bookk.png'
        />
      </Logo>
      <NavigationItem />
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #e9ecef;
`;
const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #212529;

  img {
    height: 48px;
    object-fit: contain;
    margin-top: 5px;
    cursor: pointer;
  }
`;
