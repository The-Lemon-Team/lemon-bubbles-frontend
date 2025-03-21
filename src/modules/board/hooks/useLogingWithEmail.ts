import { loginByEmail } from '../stores/userSlice';
import { useAppSelector, useAppDispatch } from '../../common/stores/hooks';

import { ILoginByEmailRequestPayload } from '../../common/api';

export const useLoginWithEmail = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.loading.isLoading);
  const error = useAppSelector((state) => state.user.loading.error);

  const signInWithEmail = (payload: ILoginByEmailRequestPayload) => {
    dispatch(loginByEmail(payload));
  };

  return {
    signInWithEmail,
    user,
    isLoading,
    error,
  };
};
