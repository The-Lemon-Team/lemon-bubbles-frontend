import { useCreateNoteMutation } from '../api/notesApi';
import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import {
  setCreated as setCreatedMode,
  setCreatingMode as setCreatingModeAction,
  resetCreatingMode as resetCreatingModeAction,
  toggleCreatingMode as toggleCreatingModeAction,
} from '../stores/notesSlice';

import { INoteCreateRequestDto } from '../../../interfaces';

export const useCreateNote = () => {
  const dispatch = useAppDispatch();
  const isCreatingMode = useAppSelector((state) => state.notes.createMode);
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
    createNoteThunk(payload).then(() => {
      dispatch(setCreatedMode(true));
    });

  return {
    isCreatingMode: isCreatingMode || isLoading,

    toggleCreatingMode,
    createNote,
    setCreatingMode,
    resetCreatingMode,
  };
};
