import { Notes } from '../../components';
import {
  useEditNote,
  useNotes,
  useCreateNote,
  useDeleteNote,
} from '../../hooks';

export const NotesContainer = () => {
  const { notes, isLoading, pagination, setPage } = useNotes();
  const { setCreatingMode } = useCreateNote();
  const { setEditId } = useEditNote();
  const { setDelitingId } = useDeleteNote();

  return (
    <Notes
      isLoading={isLoading}
      data={notes}
      pagination={pagination}
      onCreate={setCreatingMode}
      onDelete={setDelitingId}
      onEdit={setEditId}
      onPageChange={setPage}
    />
  );
};
