import {
  resetEditId as resetEditIdAction,
  setEditId as setEditIdAction,
} from '../stores';

import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import { useEditNoteMutation, useLazyLoadNoteQuery } from '../api/notesApi';

import { INote } from '../../../interfaces';

export const useEditNote = () => {
  const dispatch = useAppDispatch();
  const [editNoteThunk, { isLoading: isEditing }] = useEditNoteMutation();
  const editId = useAppSelector((state) => state.notes.editId);
  const [loadNote, { data, isLoading }] = useLazyLoadNoteQuery();

  const setEditId = (id: string) => {
    dispatch(setEditIdAction(id));
    loadNote(id);
  };
  const resetEditId = () => {
    dispatch(resetEditIdAction());
  };
  const editNote = (payload: INote) => editNoteThunk(payload);

  return {
    isLoading,
    isEditing,
    editId,
    editingNote: data,

    editNote,
    setEditId,
    resetEditId,
  };
};
