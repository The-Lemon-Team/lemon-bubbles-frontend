import {
  resetEditId as resetEditIdAction,
  setEditId as setEditIdAction,
} from '../stores';

import { useAppDispatch } from '../../common/stores/hooks';
import { useEditNoteMutation } from '../api/notesApi';

import { INote } from '../../../interfaces';

export const useEditNote = () => {
  const dispatch = useAppDispatch();
  const [editNoteThunk, { isLoading: isEditing, data }] = useEditNoteMutation();

  const setEditId = (id: string) => {
    dispatch(setEditIdAction(id));
  };
  const resetEditId = () => {
    dispatch(resetEditIdAction());
  };
  const editNote = (payload: INote) => editNoteThunk(payload);

  console.log('data ----------', data);

  return {
    isEditing,

    editNote,
    setEditId,
    resetEditId,
  };
};
