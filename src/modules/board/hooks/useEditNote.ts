import { useNotes } from './useNotes';
import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import { useEditNoteMutation } from '../api/notesApi';
import {
  setEditId as setEditIdAction,
  resetEditId as resetEditIdAction,
} from '../stores/boardSlice';

import { INote } from '../../../interfaces';

export const useEditNote = () => {
  const dispatch = useAppDispatch();
  const { notes } = useNotes();
  const [editNoteThunk, { isLoading }] = useEditNoteMutation();
  const editId = useAppSelector((state) => state.board.editId);
  const editingNote = notes?.find((note) => note.id === editId);

  const setEditId = (id: string) => {
    dispatch(setEditIdAction(id));
  };
  const resetEditId = () => {
    dispatch(resetEditIdAction());
  };

  const editNote = (payload: INote) => editNoteThunk(payload);

  return {
    isEditing: isLoading,
    editId,
    editingNote,

    editNote,
    setEditId,
    resetEditId,
  };
};
