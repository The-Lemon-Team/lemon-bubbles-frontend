import { NotesBoard } from '../../components';

import { useAppSelector } from '../../../common';
import { useNotes } from '../../hooks/useNotes';
import { useEditNote } from '../../hooks/useEditNote';
import { useCreateNote } from '../../hooks/useCreateNote';
import { useDeleteNote } from '../../hooks/useDeleteNote';

interface INotesTablesContainerProps {
  mode: 'table' | 'cards';

  onDateChange: (startDate: Date, endDate: Date) => void;
}

export const NotesBoardContainer: React.FC<INotesTablesContainerProps> = ({
  mode,
  onDateChange,
}) => {
  const { startDate, endDate } = useAppSelector(
    (state) => state.board.dateRange,
  );
  const { isLoading, notes, pagination, setPage } = useNotes({
    startDate,
    endDate,
  });
  const { setEditId } = useEditNote();
  const { setDelitingId } = useDeleteNote();
  const { setCreatingMode, toggleCreatingMode } = useCreateNote();
  const isUserLoading = useAppSelector(
    (state) => state.user.model.loading.status === 'loading',
  );

  return (
    <NotesBoard
      dateRange={{
        start: new Date(startDate),
        end: new Date(endDate),
      }}
      pagination={pagination}
      onPageChange={setPage}
      mode={mode}
      notes={notes || []}
      isLoading={isLoading || isUserLoading}
      onDateChange={onDateChange}
      toggleCreatingMode={toggleCreatingMode}
      onEdit={setEditId}
      onDelete={setDelitingId}
      onCreate={setCreatingMode}
    />
  );
};
