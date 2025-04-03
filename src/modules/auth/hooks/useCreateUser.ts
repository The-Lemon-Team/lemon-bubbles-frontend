import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import { createUser as createUserThunk } from '../stores/authSlice';

import { ICreateUserRequestDto } from '../../../interfaces';

export const useCreateUser = () => {
  const dispatch = useAppDispatch();
  const createUser = (payload: ICreateUserRequestDto) => {
    return dispatch(createUserThunk(payload));
  };
  const isCreating = useAppSelector((state) => state.auth.creating.isLoading);

  return {
    isCreating,

    createUser,
  };
};
