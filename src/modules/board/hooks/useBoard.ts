import {
  resetEditId,
  setEditId,
  setDelitingId,
  toggleCreatingMode as toggleCreatingModeAction,
  setDate,
} from '../stores/boardSlice';

import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import { useLazyLoadNotesQuery } from '../api/notesApi';

export const useBoard = () => {
  const dispatch = useAppDispatch();
  const [loadNotes, { data, isLoading }] = useLazyLoadNotesQuery();

  const mode = useAppSelector((state) => state.board.mode);
  const editId = useAppSelector((state) => state.board.editId);
  const isCreatingMode = useAppSelector((state) => state.board.isCreatingMode);
  const isEditingMode = useAppSelector((state) => !!state.board.editId);
  const editingNote = data?.find((note) => note.id === editId);

  const editNote = (id: string) => {
    dispatch(setEditId(id));
  };
  const resetEditMode = () => {
    dispatch(resetEditId());
  };
  const deleteNote = (id: string) => {
    dispatch(setDelitingId(id));
  };
  const toggleCreatingMode = () => {
    dispatch(toggleCreatingModeAction());
  };
  const changeDate = (start: Date, end: Date) => {
    const dates = {
      endDate: start.toString(),
      startDate: end.toString(),
    };

    loadNotes(dates);
    setDate(dates);
  };

  return {
    editingNote,
    notes: data,
    mode,
    isEditingMode,
    isCreatingMode,
    isLoading,

    editNote,
    deleteNote,
    toggleCreatingMode,
    changeDate,
    resetEditMode,
  };
};
