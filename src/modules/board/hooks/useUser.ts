import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import { userByToken, clearUser as clearUserAction } from '../stores/userSlice';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.loading.isLoading);
  const loadUserByToken = () => dispatch(userByToken());
  const clearUser = () => dispatch(clearUserAction());

  return {
    user,
    isLoading,

    clearUser,
    loadUserByToken,
  };
};
