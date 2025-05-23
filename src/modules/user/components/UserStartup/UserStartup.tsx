import React, { useEffect } from 'react';

import { authTransport } from '../../../common/utils';

import { useAppDispatch, useAppSelector } from '../../../common';
import { clearUser, userByToken } from '../../../user/stores/userModelSlice';

// @todo переделать в UserStartup
export const UserStartup: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.model.data);
  const isUserLoading = useAppSelector(
    (state) => state.user.model.loading.status === 'loading',
  );

  useEffect(() => {
    const tokens = authTransport.getToken();
    const hasAnyToken = !!(tokens.accessToken || tokens.refreshToken);

    if (!user && !isUserLoading && hasAnyToken) {
      dispatch(userByToken());
    }
  }, []);

  useEffect(() => {
    const unsubscribe = authTransport.onLogout(() => {
      dispatch(clearUser());
    });

    return unsubscribe;
  }, []);

  return null;
};
