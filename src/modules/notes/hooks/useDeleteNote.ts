import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import { useDeleteNoteMutation } from '../api/notesApi';
import {
  setDelitingId as setDelitingIdAction,
  resetDelitingId as resetDelitingIdAction,
} from '../stores/notesSlice';

export const useDeleteNote = () => {
  const dispatch = useAppDispatch();
  const deletingId = useAppSelector((state) => state.notes.deleteId || '');
  const [deleteNote] = useDeleteNoteMutation();

  const setDelitingId = (id: string) => {
    dispatch(setDelitingIdAction(id));
  };
  const resetDelitingId = () => {
    dispatch(resetDelitingIdAction());
  };
  const onDelete = () => {
    deleteNote(deletingId).then(resetDelitingId);
  };

  return {
    deletingId,
    onDelete,
    setDelitingId,
    resetDelitingId,
  };
};
