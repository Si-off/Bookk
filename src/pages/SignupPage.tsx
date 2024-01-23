import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from 'store/useUserStore';
import { signUp } from 'api/auth';
import * as S from 'styles/LoginStyled';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getStyledColor } from 'utils';
import secureLocalStorage from 'react-secure-storage';
import { SignUpRes, ErrorType, SignUpParams, UserState } from 'types';
const SignupPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const navigate = useNavigate();
  const user = useUserStore((state: UserState) => state.user);
  const setUser = useUserStore((state: UserState) => state.setUser);
  const setAccessToken = useUserStore(
    (state: UserState) => state.setAccessToken
  );
  useEffect(() => {
    if (user) {
      navigate('/admin/main');
    }
  });
  const { mutate } = useMutation<SignUpRes, ErrorType>({
    mutationFn: () =>
      signUp({ email, password, name, nickname } as SignUpParams),
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
    console.log('이메일인증');

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/mail/send-code`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
    const data = await res.json();
    alert(`${data.message} \n ${data.expirationTime}`);
    // timer 시작 10분
  };

  const handleVerifyCode = async () => {
    console.log('인증번호확인');
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/mail/verify-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code }),
        }
      );
      const data = await res.json();
      console.log(data);
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
          <div>
            <span>10:00</span>
            <input
              type='text'
              placeholder='인증번호를 입력해주세요.'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleVerifyCode}>확인</button>
          </div>
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

const EmailField = styled.div`
  width: 100%;
  display: flex;
`;

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
`;
