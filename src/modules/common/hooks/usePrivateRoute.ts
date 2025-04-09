import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from './useUser';

export const usePrivateRoute = () => {
  const navigate = useNavigate();
  const { user, isLoading, loadUserByToken } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      loadUserByToken()
        .unwrap()
        .catch(() => navigate('/'));
    }
  }, []);

  return null;
};
