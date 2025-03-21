import { loginByEmail } from '../stores/userSlice';
import { useAppSelector, useAppDispatch } from '../../common/stores/hooks';

import { ILoginByEmailRequestDto } from '../../../interfaces';

export const useLoginWithEmail = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.loading.isLoading);
  const isCreating = useAppSelector((state) => state.user.create.isLoading);
  const error = useAppSelector((state) => state.user.loading.error);

  const signInWithEmail = (payload: ILoginByEmailRequestDto) => {
    dispatch(loginByEmail(payload));
  };

  return {
    isCreating,
    user,
    isLoading,
    error,

    signInWithEmail,
  };
};
