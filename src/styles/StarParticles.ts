import styled, { css, keyframes } from 'styled-components';

const multipleBoxShadow = (n: number) => {
  let value = `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;

  for (let i = 2; i <= n; i++) {
    value += `, ${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`;
  }

  return value;
};

const animStar = keyframes`
  from {
    transform: translateY(0px);
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
  filter: blur(0.7px);

  &:after {
    content: ' ';
    position: absolute;
    top: 100vh;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: ${multipleBoxShadow(700)};
  }
`;

const Stars2 = styled.div`
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: ${multipleBoxShadow(200)};
  animation: ${animStar} 100s linear infinite;
  filter: blur(1px);

  &:after {
    content: ' ';
    position: absolute;
    top: 100vh;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: ${multipleBoxShadow(200)};
  }
`;

const Stars3 = styled.div`
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: ${multipleBoxShadow(100)};
  animation: ${animStar} 150s linear infinite;
  filter: blur(1.3px);

  &:after {
    content: ' ';
    position: absolute;
    top: 100vh;
    width: 3px;
    height: 3px;
    background: transparent;
    box-shadow: ${multipleBoxShadow(100)};
  }
`;

export { Stars, Stars2, Stars3 };
