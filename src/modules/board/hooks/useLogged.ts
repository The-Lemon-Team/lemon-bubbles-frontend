import { useEffect, useState } from 'react';

import { authTransport } from '../../common/api';
import { ITokens } from '../../../interfaces';
import { useUser } from './useUser';

export const useLogged = () => {
  const { user } = useUser();
  const [tokens, setTokens] = useState<ITokens>();
  const isLogged = !!tokens?.accessToken || !!tokens?.refreshToken || user;

  useEffect(() => {
    setTokens(authTransport.getToken());
  }, []);

  return {
    isLogged,
  };
};
