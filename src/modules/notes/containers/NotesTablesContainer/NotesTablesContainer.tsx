import { NotesTable } from '../../components/NotesTable';

import { useAppSelector } from '../../../common/stores/hooks';
import { useBoard } from '../../../board/hooks/useBoard';
import { useBoardNotes } from '../../../board/hooks/useBoardNotes';
import { useEditNote } from '../../hooks/useEditNote';
import { useCreateNote } from '../../hooks/useCreateNote';
import { useDeleteNote } from '../../hooks/useDeleteNote';

export const NotesTablesContainer = () => {
  const { startDate, endDate } = useAppSelector(
    (state) => state.board.dateRange,
  );
  const { isLoading, notes } = useBoardNotes({ startDate, endDate });
  const { mode, changeDate } = useBoard();
  const { setEditId } = useEditNote();
  const { setDelitingId } = useDeleteNote();
  const { setCreatingMode, toggleCreatingMode } = useCreateNote();
  const isUserLoading = useAppSelector(
    (state) => state.user.model.loading.status === 'loading',
  );

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
      onDelete={setDelitingId}
      onCreate={setCreatingMode}
    />
  );
};
