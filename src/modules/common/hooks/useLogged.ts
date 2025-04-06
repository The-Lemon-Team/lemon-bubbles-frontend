import { useEffect, useState } from 'react';

import { useAppSelector } from '../stores/hooks';
import { authTransport } from '../../common/api';

import { ITokens } from '../../../interfaces';

export const useLogged = () => {
  const user = useAppSelector((state) => state.user.data);
  const [tokens, setTokens] = useState<ITokens>();
  const isLogged = !!tokens?.accessToken || !!tokens?.refreshToken || user;

  useEffect(() => {
    setTokens(authTransport.getToken());
  }, []);

  return {
    isLogged,
  };
};
