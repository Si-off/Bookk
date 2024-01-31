import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';
import * as S from '../../styles/LoginStyled';
import { useLogin } from 'queries';
import Loader from 'components/shared/Loader';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isEmpty, setIsEmpty] = useState(true);
  const { isLogin } = useUserStore();

  const navigate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      navigate('/user');
    }
  }, [isLogin, navigate]);

  const { mutate, isLoading } = useLogin();

  useEffect(() => {
    setIsEmpty(email.length === 0 || password.length === 0);
  }, [email, password]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
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
        <Loader />
      </S.Body>
    );
  }

  return (
    <S.Body>
      <S.Layout>
        <S.Title>로그인</S.Title>
        <S.Wrapper $gap={25}>
          <S.InputField>
            <S.Label htmlFor="email">이메일</S.Label>
            <S.Input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              name="email"
              value={email}
              onChange={handleChange}
            />
          </S.InputField>
          <S.InputField>
            <S.Label htmlFor="password">비밀번호</S.Label>
            <S.Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              name="password"
              value={password}
              onChange={handleChange}
            />
          </S.InputField>
        </S.Wrapper>
        <S.Wrapper $gap={30} $marginTop={40}>
          <S.LoginButton onClick={handleLogin} disabled={isEmpty}>
            로그인
          </S.LoginButton>
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
