import React, { Suspense } from 'react';
import { useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { StorageKeys } from 'constant';
import { useUserStore } from 'store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { getAccessToken } from 'api/auth';
import { PrivateRoutes } from 'pages';
import { UserPage, LoginPage, SignupPage, MyPage } from 'pages/user';
import { useGetUser } from 'queries';

const AdminManage = React.lazy(() => import('../src/pages/admin/AdminManage'));
const AdminCreateItem = React.lazy(() => import('../src/pages/admin/AdminCreateItem'));
const AdminEditItem = React.lazy(() => import('../src/pages/admin/AdminEditItem'));
const AdminMain = React.lazy(() => import('../src/pages/admin/AdminMain'));
const AdminDashboard = React.lazy(() => import('../src/pages/admin/AdminDashboard'));
const AdminManageUsers = React.lazy(() => import('../src/pages/admin/AdminManageUsers'));
const AdminManageReviews = React.lazy(() => import('../src/pages/admin/AdminManageReviews'));

function App() {
  const { isLogin, setIsLogin, setIsInit, setAccessToken } = useUserStore();
  const queryClient = useQueryClient();

  useGetUser(isLogin);

  useEffect(() => {
    const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN);
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
      <Suspense>
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
                <Route path="reviews" element={<AdminManageReviews />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
