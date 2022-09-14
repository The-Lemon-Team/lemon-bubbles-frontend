import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

import { useFirebaseAuth } from '../../../firebase/useFirebaseAuth';

interface IPrivateRouteProps extends RouteProps {
  children?: React.ReactNode;
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  const { user } = useFirebaseAuth();

  return user ? <>{children}</> : <Navigate to="/auth" />;
};
