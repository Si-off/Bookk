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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
  width: 100%;
  max-width: ${pixelToRem(430)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 300;
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
  padding: 15px 20px;
  background-color: ${getStyledColor('gray', 300)};
  color: ${getStyledColor('gray', 800)};
  border: none;
  border-radius: 8px;

  &:focus {
    outline: 1px solid ${getStyledColor('blue', 500)};
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: ${getStyledColor('blue', 800)};
  color: ${getStyledColor('gray', 100)};
  border-radius: 8px;
  font-weight: 500;
  padding: 15px;
  border: none;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${getStyledColor('blue', 900)};
  }

  &:active {
    background-color: ${getStyledColor('blue', 1000)};
  }

  &:disabled {
    background-color: ${getStyledColor('gray', 500)};
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
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  color: ${getStyledColor('blue', 800)};
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
};

export const StyledLoader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
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
