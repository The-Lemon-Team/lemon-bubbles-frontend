import { useAppDispatch, useAppSelector } from '../../common';
import { createUser as createUserThunk } from '../stores/userCreatingSlice';

import { ICreateUserRequestDto } from '../../../interfaces';

export const useCreateUser = () => {
  const dispatch = useAppDispatch();
  const createUser = (payload: ICreateUserRequestDto) => {
    return dispatch(createUserThunk(payload));
  };
  const isCreating = useAppSelector(
    (state) => state.user.creating.create.status === 'loading',
  );

  return {
    isCreating,

    createUser,
  };
};
