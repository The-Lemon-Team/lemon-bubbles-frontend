import { useAppSelector } from '../../common/stores/hooks';
import { authTransport } from '../../common/utils/authTransport';

export const useUser = () => {
  const user = useAppSelector((state) => state.user.model.data);
  const isLoading = useAppSelector(
    (state) => state.user.model.loading.status === 'loading',
  );
  const logout = () => authTransport.logout();

  return {
    isLoading,
    user,
    logout,
  };
};
