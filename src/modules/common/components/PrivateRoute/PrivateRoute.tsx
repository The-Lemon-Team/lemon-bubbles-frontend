import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../stores/hooks';
import { useLogged } from '../../../auth';

interface IPrivateRouteProps {
  children?: React.ReactNode;
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  const isUserLoading = useAppSelector(
    (state) => state.user.model.loading.status === 'loading',
  );
  const isLogged = useLogged();

  return isLogged || isUserLoading ? <>{children}</> : <Navigate to="/auth" />;
};
