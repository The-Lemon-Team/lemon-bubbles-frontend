import { useCreateNoteMutation } from '../api/notesApi';
import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import {
  setCreatingMode as setCreatingModeAction,
  resetCreatingMode as resetCreatingModeAction,
  toggleCreatingMode as toggleCreatingModeAction,
} from '../stores/notesCreatingSlice';

import { INoteCreateRequestDto } from '../../../interfaces';

export const useCreateNote = () => {
  const dispatch = useAppDispatch();
  const isCreatingMode = useAppSelector(
    (state) => state.notesCreating.createMode,
  );
  const [createNoteThunk, { isLoading }] = useCreateNoteMutation();
  const setCreatingMode = () => {
    dispatch(setCreatingModeAction());
  };
  const toggleCreatingMode = () => {
    dispatch(toggleCreatingModeAction());
  };
  const resetCreatingMode = () => {
    dispatch(resetCreatingModeAction());
  };
  const createNote = (payload: INoteCreateRequestDto) =>
    createNoteThunk(payload);

  return {
    isCreatingMode: isCreatingMode || isLoading,

    toggleCreatingMode,
    createNote,
    setCreatingMode,
    resetCreatingMode,
  };
};
