import { notesApi, useCreateNoteMutation } from '../api/notesApi';
import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';

import {
  setCreatingMode as setCreatingModeAction,
  resetCreatingMode as resetCreatingModeAction,
} from '../stores/boardSlice';
import { INoteFormSubmitValues } from '../../../interfaces';

export const useCreateNote = () => {
  const dispatch = useAppDispatch();
  const isCreatingMode = useAppSelector((state) => state.board.isCreatingMode);
  const [createNoteThunk, { isLoading }] = useCreateNoteMutation();
  const setCreatingMode = () => {
    dispatch(setCreatingModeAction());
  };
  const resetCreatingMode = () => {
    dispatch(resetCreatingModeAction());
  };
  const createNote = (payload: INoteFormSubmitValues) => {
    createNoteThunk(payload);
  };

  return {
    isCreatingMode: isCreatingMode || isLoading,

    createNote,
    setCreatingMode,
    resetCreatingMode,
  };
};
