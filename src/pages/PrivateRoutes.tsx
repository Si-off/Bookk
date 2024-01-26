import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';

const PrivateRoutes = () => {
  const { isLogin, isInit } = useUserStore();
  return isLogin || isInit ? <Outlet /> : <Navigate to={'/'} />;
};

export default PrivateRoutes;
