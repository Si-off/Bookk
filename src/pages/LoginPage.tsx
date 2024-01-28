import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';
import * as S from '../styles/LoginStyled';
import { useLogin } from 'queries';
import { getStyledColor } from 'utils';
import { styled } from 'styled-components';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [disabled, setDisabled] = useState(true);
  const { isLogin } = useUserStore();

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate('/user');
    }
  }, [isLogin, navigate]);

  const { mutate, isLoading } = useLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    switch (name) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
    }

    email && password ? setDisabled(false) : setDisabled(true);
  };

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
        <Title>로그인</Title>
        <S.Wrapper $gap={25}>
          <S.InputField>
            <S.Label htmlFor='email'>Email</S.Label>
            <S.Input
              id='email'
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={handleChange}
            />
          </S.InputField>
          <S.InputField>
            <S.Label htmlFor='password'>Password</S.Label>
            <S.Input
              id='password'
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </S.InputField>
        </S.Wrapper>
        <S.Wrapper $gap={30} $marginTop={40}>
          <S.LoginButton onClick={handleLogin} disabled={disabled}>
            로그인
          </S.LoginButton>
          <S.Divider>
            <div>OR</div>
          </S.Divider>

          <div>
            <S.RegistText>아직 회원이 아니신가요?</S.RegistText>
            <S.StyledLink to='/signup'>회원가입</S.StyledLink>
          </div>
        </S.Wrapper>
      </S.Layout>
    </S.Body>
  );
};

export default LoginPage;

const Title = styled.h2`
  font-size: 24px;
  color: ${getStyledColor('white', 'high')};
  margin-bottom: 12px;
`;
