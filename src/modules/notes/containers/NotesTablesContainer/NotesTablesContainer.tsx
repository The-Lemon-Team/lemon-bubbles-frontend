import { useSelector } from 'react-redux';

import { selectDateRange } from '../../../common/redux/store';
import { useGetNotesQuery } from '../../stores/notesApi';
import { useRootStore } from '../../../common/stores';
import { useActions } from '../../../common/redux/store';

import { NotesTable } from '../../components';

export const NotesTablesContainer = () => {
  const { boardStore, notesTable } = useRootStore();
  const dateRange = useSelector(selectDateRange);
  const { setDateRange } = useActions();

  const { isLoading, data } = useGetNotesQuery(dateRange);
  const { notesStore } = boardStore;

  return (
    <NotesTable
      dateRange={dateRange}
      mode={notesTable.mode as 'table' | 'cards'}
      isCreatingMode={notesTable.isCreatingMode}
      notes={data}
      isLoading={isLoading}
      onDateChange={setDateRange}
      toggleCreatingMode={notesTable.toggleCreatingMode}
      onDelete={notesStore.deleteNote}
    />
  );
};
