import {
  resetEditId as resetEditIdAction,
  setEditId as setEditIdAction,
} from '../stores';

import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import { useEditNoteMutation } from '../api/notesApi';
import { useNote } from './useNote';

import { INote } from '../../../interfaces';

export const useEditNote = () => {
  const dispatch = useAppDispatch();
  const [editNoteThunk, { isLoading: isEditing }] = useEditNoteMutation();
  const editId = useAppSelector((state) => state.notesCreating.editId);
  const { data: editingNote } = useNote(editId || '');

  const setEditId = (id: string) => {
    dispatch(setEditIdAction(id));
  };
  const resetEditId = () => {
    dispatch(resetEditIdAction());
  };

  const editNote = (payload: INote) => editNoteThunk(payload);

  return {
    isEditing,
    editId,
    editingNote,

    editNote,
    setEditId,
    resetEditId,
  };
};
