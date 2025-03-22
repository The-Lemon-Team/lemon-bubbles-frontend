import {
  resetEditId,
  setEditId as setEditIdAction,
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
  const isCreatingMode = useAppSelector((state) => state.board.isCreatingMode);
  const isEditingMode = useAppSelector((state) => !!state.board.editId);

  const setEditId = (id: string) => {
    dispatch(setEditIdAction(id));
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
    notes: data,
    mode,
    isEditingMode,
    isCreatingMode,
    isLoading,

    setEditId,
    deleteNote,
    toggleCreatingMode,
    changeDate,
    resetEditMode,
  };
};
