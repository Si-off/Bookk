import { useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import CustomAxiosInstance from 'api/axios';
import secureLocalStorage from 'react-secure-storage';
import { QueryKeys, StorageKeys } from 'constant';
import { useUserStore } from 'store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { getUser } from 'api/auth';
<<<<<<< HEAD
import UserPage from 'pages/UserPage';
import {
  AdminManage,
  AdminCreateItem,
  AdminEditItem,
  AdminMain,
} from 'pages/adminpage';
import MyPage from 'pages/MyPage';
=======
import UserPage from 'pages/user/UserPage';
import { AdminManage, AdminCreateItem, AdminEditItem, AdminMain } from 'pages/admin';
import { PrivateRoutes } from 'pages';
import { LoginPage, SignupPage } from 'pages/user';
>>>>>>> 7543984cf09b0ff039fb307c59e42cf05aaff213

function App() {
  const { isLogin, setIsLogin, setIsInit } = useUserStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN);
    if (refreshToken && typeof refreshToken === 'string' && !isLogin) {
      (async () => {
        await CustomAxiosInstance.init();
        await queryClient.fetchQuery({
          queryKey: [QueryKeys.LOGIN],
          queryFn: getUser,
        });
      })();
      setIsLogin(true);
    }
    setIsInit(false);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigation />}>
          <Route path='/' element={<UserPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path='/admin' element={<AdminMain />}>
            <Route path='/admin/create' element={<AdminCreateItem />} />
            <Route path='/admin/manage' element={<AdminManage />} />
            <Route path='/admin/edit/:id' element={<AdminEditItem />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
