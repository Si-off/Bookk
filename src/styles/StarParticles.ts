import styled, { css, keyframes } from 'styled-components';

const multipleBoxShadow = (n: number) => {
  let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(
    Math.random() * 2000,
  )}px rgba(255, 255, 255, 0.5)`;

  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(
      Math.random() * 2000,
    )}px rgba(255, 255, 255, 0.5)`;
  }

  return value;
};

const animStar = keyframes`

  from {
    transform: translateY(0vh);

  }
  to {
    transform: translateY(-100vh);
  }
`;

const Stars = styled.div`
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${multipleBoxShadow(700)};
  animation: ${animStar} 50s linear infinite;
  border-radius: 50%;

  &:after {
    content: ' ';
    position: absolute;
    top: 100vh;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: ${multipleBoxShadow(700)};
    border-radius: inherit;
  }
`;

const Stars2 = styled.div`
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: ${multipleBoxShadow(200)};
  animation: ${animStar} 100s linear infinite;
  border-radius: 50%;

  &:after {
    content: ' ';
    position: absolute;
    top: 100vh;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: ${multipleBoxShadow(200)};
    border-radius: inherit;
  }
`;

const Stars3 = styled.div`
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: ${multipleBoxShadow(100)};
  animation: ${animStar} 150s linear infinite;
  border-radius: 50%;

  &:after {
    content: ' ';
    position: absolute;
    top: 100vh;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: ${multipleBoxShadow(100)};
    border-radius: inherit;
  }
`;

export { Stars, Stars2, Stars3 };
