import { useIsFetching } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';

const PrivateRoutes = () => {
  const { isLogin } = useUserStore();
  const isFetching = useIsFetching({ queryKey: [QueryKeys.LOGIN] });

  return isLogin ? <Outlet /> : <Navigate to={'/'} />;
};

export default PrivateRoutes;
