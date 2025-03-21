import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../stores/hooks';

interface IPrivateRouteProps {
  children?: React.ReactNode;
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  const user = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.loading.isLoading);

  return user || isLoading ? <>{children}</> : <Navigate to="/auth" />;
};
