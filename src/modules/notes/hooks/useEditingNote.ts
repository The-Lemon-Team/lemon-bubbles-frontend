import { useAppSelector } from '../../common';
import { useLoadNoteQuery } from '../api';

export const useEditingNote = () => {
  const editId = useAppSelector((state) => state.notes.editId);
  const { data, isLoading } = useLoadNoteQuery(editId || '', {
    skip: !editId,
  });

  return {
    data,
    isLoading,
  };
};
