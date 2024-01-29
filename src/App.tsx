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
import UserPage from 'pages/user/UserPage';
=======
>>>>>>> 7e1c0e0966fe13c6173a506151fb29f90b364d49
import {
  AdminManage,
  AdminCreateItem,
  AdminEditItem,
  AdminMain,
<<<<<<< HEAD
} from 'pages/admin';
import { PrivateRoutes } from 'pages';
import { LoginPage, SignupPage } from 'pages/user';
=======
  AdminDashboard,
} from 'pages/admin';
import { PrivateRoutes } from 'pages';
import { UserPage, LoginPage, SignupPage, MyPage } from 'pages/user';
>>>>>>> 7e1c0e0966fe13c6173a506151fb29f90b364d49

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
            <Route path='' element={<AdminDashboard />} />
            <Route path='create' element={<AdminCreateItem />} />
            <Route path='manage' element={<AdminManage />} />
            <Route path='edit/:id' element={<AdminEditItem />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
