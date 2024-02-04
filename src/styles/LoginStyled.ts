import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { pixelToRem, getStyledColor } from 'utils';

interface WrapperProps {
  $gap?: number;
  $marginTop?: number;
}
interface InputFieldProps {
  $marginTop?: number;
}

const Body = styled.div`
  background-color: #282828;
  width: 100%;
  height: 100vh;
`;

const Title = styled.h2`
  font-size: 24px;
  color: ${getStyledColor('white', 'high')};
  margin-bottom: 12px;
`;

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $gap }) => ($gap ? $gap + 'px' : '')};
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop + 'px' : '')};
`;

const Layout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: ${pixelToRem(430)};
  min-height: ${pixelToRem(200)}; /* 최소 높이 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${getStyledColor('gray', 1000)};
  padding: 40px 48px;
  border-radius: 4px;
  box-shadow:
    0px 11px 15px 0px rgba(0, 0, 0, 0.2),
    0px 9px 46px 0px rgba(0, 0, 0, 0.12),
    0px 24px 38px 0px rgba(0, 0, 0, 0.14);
  overflow: auto; /* 스크롤 가능하게 설정 */

  /* 노트북 화면 크기에 대한 미디어 쿼리 */
  @media (max-width: 1440px) {
    max-width: ${pixelToRem(400)};
    padding: 30px 36px;
  }

  @media (max-width: 1024px) {
    max-width: ${pixelToRem(360)};
    padding: 20px 24px;
  }
`;

const Label = styled.label`
  font-weight: 400;
  color: ${getStyledColor('white', 'medium')};
  margin-bottom: 20px;
`;

const InputField = styled.div<InputFieldProps>`
  width: 100%;
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop + 'px' : '')};

  input {
    margin-top: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  max-width: ${pixelToRem(380)};
  padding: 15px 20px;
  background-color: ${getStyledColor('gray', 500)};
  color: ${getStyledColor('gray', 1200)};
  border: 3px solid rgba(0, 0, 0, 0);
  border-radius: 2px;
  transition: border 0.2s ease;

  &:focus {
    border: 3px solid ${getStyledColor('primary', 600)};
  }

  &::placeholder {
    color: ${getStyledColor('gray', 900)};
  }
`;

const LoginButton = styled.button`
  width: 100%;
  max-width: ${pixelToRem(380)};
  background-color: ${getStyledColor('primary', 500)};
  color: ${getStyledColor('gray', 100)};
  border-radius: 8px;
  font-weight: 500;
  padding: 15px;
  border: none;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${getStyledColor('primary', 700)};
  }

  &:active {
    background-color: ${getStyledColor('primary', 900)};
  }

  &:disabled {
    background-color: ${getStyledColor('white', 'disabled')};
    color: ${getStyledColor('white', 'medium')};
  }
`;

const KakaoButton = styled.button`
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: rgba(0, 0, 0, 0.9);
  background-color: #fee500;
  border: none;
  border-radius: 8px;
  font-weight: 400;
`;

const Divider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${getStyledColor('gray', 800)};
  }

  & div {
    padding: 0 10px;
    color: ${getStyledColor('gray', 800)};
    font-weight: 300;
    user-select: none;
  }
`;

const RegistText = styled.span`
  font-size: 14px;
  margin-right: 4px;
  color: ${getStyledColor('white', 'high')};
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  color: ${getStyledColor('primary', 300)};

  &:hover {
    color: ${getStyledColor('primary', 200)};
  }
`;

export {
  Body,
  Wrapper,
  Layout,
  Label,
  InputField,
  Input,
  LoginButton,
  KakaoButton,
  Divider,
  RegistText,
  StyledLink,
  Title,
};

export const StyledLoader = styled.div<{ $size: string }>`
  display: inline-block;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
