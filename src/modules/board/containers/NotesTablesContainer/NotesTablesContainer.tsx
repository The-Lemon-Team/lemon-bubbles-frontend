import { NotesTable } from '../../components/NotesTable';

import { useAppSelector } from '../../../common/stores/hooks';
import { useBoard } from '../../hooks/useBoard';
import { useNotes } from '../../hooks/useNotes';

export const NotesTablesContainer = () => {
  const { startDate, endDate, isLoading, notes } = useNotes();
  const {
    mode,
    isCreatingMode,
    editNote,
    deleteNote,
    toggleCreatingMode,
    changeDate,
  } = useBoard();
  const isUserLoading = useAppSelector((state) => state.user.loading.isLoading);

  return (
    <NotesTable
      dateRange={{
        start: new Date(startDate),
        end: new Date(endDate),
      }}
      isFormEnabled={isCreatingMode}
      mode={mode as 'table' | 'cards'}
      notes={notes || []}
      isLoading={isLoading || isUserLoading}
      onDateChange={changeDate}
      toggleCreatingMode={toggleCreatingMode}
      onEdit={editNote}
      onDelete={deleteNote}
    />
  );
};
