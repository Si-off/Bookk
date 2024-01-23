import React, { useEffect, useState, ChangeEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from 'api/auth';
import { useUserStore } from 'store/useUserStore';
import { UserState, ErrorType, LoginResponse } from 'types';
import secureLocalStorage from 'react-secure-storage';
import * as S from '../styles/LoginStyled';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const user = useUserStore((state: UserState) => state.user);
  const setUser = useUserStore((state: UserState) => state.setUser);
  const setAccessToken = useUserStore((state: UserState) => state.setAccessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/user');
    }
  }, [user, navigate]);

  const { mutate, isLoading } = useMutation<
    LoginResponse,
    ErrorType,
    { email: string; password: string }
  >({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.userInfo);
      setAccessToken(data.accessToken);
      secureLocalStorage.setItem('refreshToken', data.refreshToken);
      navigate('/user');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    mutate({ email, password });
  };

  if (isLoading) {
    return (
      <S.Body>
        <S.StyledLoader />
      </S.Body>
    );
  }

  return (
    <S.Body>
      <S.Layout>
        <h2>로그인</h2>
        <S.Wrapper $gap={25}>
          <S.InputField>
            <S.Label htmlFor="email">Email</S.Label>
            <S.Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </S.InputField>
          <S.InputField>
            <S.Label htmlFor="password">Password</S.Label>
            <S.Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </S.InputField>
        </S.Wrapper>
        <S.Wrapper $gap={30} $marginTop={40}>
          <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>
          <S.Divider>
            <div>OR</div>
          </S.Divider>

          <div>
            <S.RegistText>아직 회원이 아니신가요?</S.RegistText>
            <S.StyledLink to="/signup">회원가입</S.StyledLink>
          </div>
        </S.Wrapper>
      </S.Layout>
    </S.Body>
  );
};

export default LoginPage;
