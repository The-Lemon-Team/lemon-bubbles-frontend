import { useAppSelector } from '../../../common';
import { NotesTable } from '../../components';

import {
  useNotes,
  useEditNote,
  useCreateNote,
  useDeleteNote,
} from '../../hooks';

interface INotesTablesContainerProps {
  mode: 'table' | 'cards';

  onDateChange: (startDate: Date, endDate: Date) => void;
}

export const NotesTablesContainer: React.FC<INotesTablesContainerProps> = ({
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
    <NotesTable
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
