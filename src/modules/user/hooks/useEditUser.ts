import { useAppDispatch, useAppSelector } from '../../common';
import { editUser as editUserThunk } from '../stores/userCreatingSlice';

import { IUserEditForm } from '../../../interfaces';

export const useEditUser = () => {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(
    (state) => state.user.creating.create.status === 'loading',
  );

  const editUser = (editUserForm: IUserEditForm) => {
    dispatch(editUserThunk(editUserForm));
  };

  return {
    isEditing,
    editUser,
  };
};
