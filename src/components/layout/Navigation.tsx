import React from "react";
import styled from "styled-components";
import NavigationItem from "./NavigationItem";
const Navigation = () => {
  return (
    <NavigationWrapper>
      <Logo>
        <span>Logo</span>
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
`;
