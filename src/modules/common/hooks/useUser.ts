import { useAppDispatch, useAppSelector } from '../stores/hooks';
import {
  userByToken,
  clearUser as clearUserAction,
} from '../../board/stores/userSlice';
import { IUserEditForm } from '../../../interfaces';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.loading.isLoading);

  const loadUserByToken = () => dispatch(userByToken());
  const clearUser = () => dispatch(clearUserAction());
  const editUser = (editUserForm: IUserEditForm) => {
    console.log('editUserForm', editUserForm);
  };

  return {
    user,
    isLoading,

    editUser,
    clearUser,
    loadUserByToken,
  };
};
