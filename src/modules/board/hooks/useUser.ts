import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import {
  userByToken,
  clearUser as clearUserAction,
  createUser as createUserAction,
} from '../stores/userSlice';

import { ICreateUserRequestDto } from '../../../interfaces';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.loading.isLoading);
  const isCreating = useAppSelector((state) => state.user.create.isLoading);

  const loadUserByToken = () => dispatch(userByToken());
  const clearUser = () => dispatch(clearUserAction());
  const createUser = (payload: ICreateUserRequestDto) =>
    dispatch(createUserAction(payload));

  return {
    user,
    isLoading,
    isCreating,

    createUser,
    clearUser,
    loadUserByToken,
  };
};
