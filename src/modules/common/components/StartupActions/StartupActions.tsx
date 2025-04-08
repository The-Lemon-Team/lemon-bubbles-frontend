import React, { useEffect } from 'react';

import { authTransport } from '../../api';

import { useUser } from '../../hooks/useUser';

export const StartupActions: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { loadUserByToken, clearUser } = useUser();

  useEffect(() => {
    const onLogoutListener = () => clearUser();

    loadUserByToken();

    return authTransport.onLogout(onLogoutListener);
  }, []);

  return <>{children}</>;
};
