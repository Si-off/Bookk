import { useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { StorageKeys } from 'constant';
import { useUserStore } from 'store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { getAccessToken } from 'api/auth';
import {
  AdminManage,
  AdminCreateItem,
  AdminEditItem,
  AdminMain,
  AdminDashboard,
  AdminManageUsers,
} from 'pages/admin';
import { PrivateRoutes } from 'pages';
import { UserPage, LoginPage, SignupPage, MyPage } from 'pages/user';
import { useGetUser } from 'queries';
import { getToken } from 'utils/getToken';

function App() {
  const { isLogin, setIsLogin, setIsInit, setAccessToken } = useUserStore();
  const queryClient = useQueryClient();

  useGetUser(isLogin);

  useEffect(() => {
    const refreshToken = getToken('refreshToken');

    if (refreshToken && typeof refreshToken === 'string' && !isLogin) {
      (async () => {
        const accessToken = await getAccessToken();
        accessToken && setAccessToken(accessToken);
        setIsLogin(true);
        setIsInit(false);
      })();
    }
  }, [queryClient, setIsLogin, setIsInit, setAccessToken]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigation />}>
            <Route path="/" element={<UserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={<AdminMain />}>
              <Route path="" element={<AdminDashboard />} />
              <Route path="create" element={<AdminCreateItem />} />
              <Route path="books" element={<AdminManage />} />
              <Route path="books/detail/:id" element={<AdminEditItem />} />
              <Route path="users" element={<AdminManageUsers />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
