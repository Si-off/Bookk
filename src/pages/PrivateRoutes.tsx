import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';

const PrivateRoutes = () => {
  const { isLogin } = useUserStore();

  return isLogin ? <Outlet /> : <Navigate to={'/'} />;
};

export default PrivateRoutes;
