import { useAppSelector } from '../../common/stores/hooks';

import { IUserEditForm } from '../../../interfaces';

export const useEditUser = () => {
  const isEditing = useAppSelector(
    (state) => state.user.creating.create.status === 'loading',
  );

  const editUser = (editUserForm: IUserEditForm) => {
    console.log('editUserForm', editUserForm);
  };

  return {
    isEditing,
    editUser,
  };
};
