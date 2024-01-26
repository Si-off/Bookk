import { useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import AdminManage from './pages/adminpage/AdminManage';
import AdminCreateItem from './pages/adminpage/AdminCreateItem';
import AdminEditItem from './pages/adminpage/AdminEditItem';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserPage from './pages/userpage/UserPage';
import { LoginPage, MainPage, SignupPage } from 'pages';
import CustomAxiosInstance from 'api/axios';
import secureLocalStorage from 'react-secure-storage';
import { StorageKeys } from 'constant';
import { useGetUser } from 'queries';
import { useUserStore } from 'store/useUserStore';
import PrivateRoutes from 'pages/PrivateRoutes';

function App() {
  const { isLogin } = useUserStore();
  const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN);
  if (refreshToken && typeof refreshToken === 'string' && !isLogin) {
    useGetUser(refreshToken);
  }
  useEffect(() => {
    CustomAxiosInstance.init();
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='*' element={<Navigate to='/' />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/admin' element={<AdminManage />} />
          <Route path='/admin/create' element={<AdminCreateItem />} />
          <Route path='/admin/edit/:id' element={<AdminEditItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
