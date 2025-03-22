import { NotesTable } from '../../components/NotesTable';

import { useAppSelector } from '../../../common/stores/hooks';
import { useBoard } from '../../hooks/useBoard';
import { useNotes } from '../../hooks/useNotes';
import { useEditNote } from '../../hooks/useEditNote';

export const NotesTablesContainer = () => {
  const { startDate, endDate, isLoading, notes } = useNotes();
  const { mode, isCreatingMode, deleteNote, toggleCreatingMode, changeDate } =
    useBoard();
  const { setEditId } = useEditNote();
  const isUserLoading = useAppSelector((state) => state.user.loading.isLoading);

  return (
    <NotesTable
      dateRange={{
        start: new Date(startDate),
        end: new Date(endDate),
      }}
      mode={mode as 'table' | 'cards'}
      notes={notes || []}
      isLoading={isLoading || isUserLoading}
      onDateChange={changeDate}
      toggleCreatingMode={toggleCreatingMode}
      onEdit={setEditId}
      onDelete={deleteNote}
    />
  );
};
