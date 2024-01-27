import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import { useUserStore } from 'store/useUserStore';
import { signUp } from 'api/auth';
import * as S from 'styles/LoginStyled';
import { getStyledColor } from 'utils';

const SignupPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const [isVerify, setIsVerify] = useState<boolean>(false);

  const navigate = useNavigate();

  const { isLogin, setIsLogin } = useUserStore((state) => state);

  useEffect(() => {
    if (isLogin) {
      navigate('/admin/main');
    }
  });
  const { mutate } = useMutation({
    mutationFn: () => signUp({ email, password, name, nickname }),

    onSuccess: (data) => {
      if (!data) return;
      setIsLogin(true);
      secureLocalStorage.setItem('refreshToken', data.refreshToken);
      navigate('/user');
    },
  });

  const handleSignup = () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!email || !password || !name || !nickname) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    mutate();
  };

  const handleSendToEmail = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/mail/send-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    alert(`${data.message} \n ${data.expirationTime}`);

    // TODO: 요청 성공 시 true로 변경
    setIsVerify(true);
  };

  const handleVerifyCode = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/mail/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      setIsVerify(false);
      alert('인증이 완료되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Body>
      <S.Layout>
        <h2>회원가입</h2>
        <S.Wrapper $gap={25}>
          <EmailField>
            <S.InputField>
              <S.Label>이메일 </S.Label>
              <S.Input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </S.InputField>
            <AuthButton onClick={handleSendToEmail}>인증하기</AuthButton>
          </EmailField>
          {isVerify && (
            <EmailField>
              <S.InputField>
                <S.Label>인증번호</S.Label>
                <S.Input
                  type='text'
                  placeholder='인증번호를 입력해주세요.'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </S.InputField>
              <AuthButton onClick={handleVerifyCode}>확인</AuthButton>
            </EmailField>
          )}

          <S.InputField>
            <S.Label>비밀번호 </S.Label>
            <S.Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </S.InputField>
          <S.InputField>
            <S.Label>비밀번호 확인 </S.Label>
            <S.Input
              type='password'
              placeholder='Password Confirm'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </S.InputField>

          <S.InputField>
            <S.Label>이름 </S.Label>
            <S.Input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </S.InputField>
          <S.InputField>
            <S.Label>닉네임 </S.Label>
            <S.Input
              type='text'
              placeholder='Nick Name'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </S.InputField>
        </S.Wrapper>
        <S.Wrapper $gap={20} $marginTop={40}>
          <S.LoginButton onClick={handleSignup}>회원가입</S.LoginButton>
          <div>
            <S.RegistText>이미 회원이신가요?</S.RegistText>
            <S.StyledLink to='/login'>로그인</S.StyledLink>
          </div>
        </S.Wrapper>
      </S.Layout>
    </S.Body>
  );
};

export default SignupPage;

const AuthButton = styled.button`
  color: ${getStyledColor('blue', 800)};
  border: 2px solid ${getStyledColor('blue', 800)};
  border-radius: 6px;
  background-color: #fff;
  font-weight: 500;
  margin-left: 30px;
  white-space: nowrap;
  height: 42px;
  align-self: flex-end;
  padding: 6px 12px;

  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    background-color: ${getStyledColor('blue', 800)};
    color: #fff;
  }

  &:active {
    background-color: ${getStyledColor('blue', 900)};
    color: #fff;
    border-color: ${getStyledColor('blue', 900)};
  }
`;
const EmailField = styled.div`
  width: 100%;
  display: flex;
`;
