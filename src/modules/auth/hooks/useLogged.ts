import { useEffect, useState } from 'react';

import { authTransport } from '../../common';

import { ITokens } from '../../../interfaces';

export const useLogged = () => {
  const [tokens, setTokens] = useState<ITokens>(authTransport.getToken());
  const isLogged = tokens.accessToken || tokens.refreshToken;

  useEffect(() => {
    const unsubsribe = authTransport.onRefreshToken(() => {
      setTokens(authTransport.getToken());
    });

    return unsubsribe;
  }, []);

  return !!isLogged;
};
