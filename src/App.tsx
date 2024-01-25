import { useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import AdminManage from './pages/adminpage/AdminManage';
import AdminCreateItem from './pages/adminpage/AdminCreateItem';
import AdminEditItem from './pages/adminpage/AdminEditItem';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserPage from './pages/userpage/UserPage';
import { LoginPage, MainPage, SignupPage } from 'pages';
import CustomAxiosInstance from 'api/axios';

function App() {
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
        <Route path='/admin' element={<AdminManage />} />
        <Route path='/admin/create' element={<AdminCreateItem />} />
        <Route path='/admin/edit/:id' element={<AdminEditItem />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
