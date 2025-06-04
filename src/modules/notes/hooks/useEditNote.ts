import {
  resetEditId as resetEditIdAction,
  setEditId as setEditIdAction,
} from '../stores';

import { useAppDispatch } from '../../common/stores/hooks';
import { useEditNoteMutation } from '../api/notesApi';

import { INote } from '../../../interfaces';

export const useEditNote = () => {
  const dispatch = useAppDispatch();
  const [editNoteThunk, { isLoading: isEditing }] = useEditNoteMutation();

  const setEditId = (id: string) => {
    dispatch(setEditIdAction(id));
  };
  const resetEditId = () => {
    dispatch(resetEditIdAction());
  };
  const editNote = (payload: INote) => editNoteThunk(payload);

  return {
    isEditing,

    editNote,
    setEditId,
    resetEditId,
  };
};
