import React, { useEffect, useState, ChangeEvent } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
// import { login, kakaoLogin } from 'api/auth';
// import { useUserStore } from 'store/useUserStore';
// import Kakao from 'images/icons/Kakao'; // 가정된 경로
import * as S from "../styles/LoginStyled";

interface LoginResponse {
  // 로그인 응답의 타입 (가정)
  // ...응답 구조에 맞는 필드 정의
}

interface LoginError {
  // 로그인 에러의 타입 (가정)
  // ...에러 구조에 맞는 필드 정의
}

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //   const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  //   const user = useUserStore((state) => state.user);

  //   useEffect(() => {
  //     if (user) {
  //       navigate('/admin/main');
  //     }
  //   }, [user, navigate]);

  //   const { mutate, isLoading } = useMutation<LoginResponse, LoginError, { email: string; password: string }>(login, {
  //     onSuccess: (data) => {
  //       setUser(data);
  //       console.log('user', user);
  //       navigate('/admin/main');
  //     },
  //   });

  //   const { mutate: kakao } = useMutation<LoginResponse, LoginError, void>(kakaoLogin, {
  //     onSuccess: async (data) => {
  //       console.log('success kakao', data);
  //       await setUser(data);
  //     },
  //     onError: (error) => {
  //       console.error('Kakao login failed', error);
  //     },
  //   });

  //   const handleKakaoLogin = () => {
  //     kakao();
  //   };

  const handleLogin = () => {
    console.log("login");
  };

  //   if (isLoading) {
  //     return (
  //       <S.Body>
  //         <S.StyledLoader />
  //       </S.Body>
  //     );
  //   }

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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </S.InputField>
          <S.InputField>
            <S.Label htmlFor="password">Password</S.Label>
            <S.Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </S.InputField>
        </S.Wrapper>
        <S.Wrapper $gap={30} $marginTop={40}>
          <S.LoginButton onClick={handleLogin}>로그인</S.LoginButton>
          <S.Divider>
            <div>OR</div>
          </S.Divider>
          {/* <S.KakaoButton onClick={handleKakaoLogin}>
            <img src={Kakao} width={16} />
            카카오로 시작하기
          </S.KakaoButton> */}
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
