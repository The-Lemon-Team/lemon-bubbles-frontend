import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../../common/stores';

import { NotesTable } from '../../components';

export const NotesTablesContainer = observer(() => {
  const { boardStore, notesTable } = useRootStore();
  const { notesStore } = boardStore;

  useEffect(() => {
    const dateRange = boardStore.dateRange.getDateRange();
    const status = notesStore.loading.status;

    if (!['loading', 'success'].includes(status || '')) {
      boardStore.loadNotes(dateRange.start, dateRange.end);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardStore.dateRange]);

  return (
    <NotesTable
      dateRange={{
        start: boardStore.dateRange.start,
        end: boardStore.dateRange.end,
      }}
      mode={notesTable.mode as 'table' | 'cards'}
      isCreatingMode={notesTable.isCreatingMode}
      notes={notesStore.getNotes()}
      isLoading={notesStore.loading.getIsLoading()}
      onDateChange={boardStore.loadNotes}
      toggleCreatingMode={notesTable.toggleCreatingMode}
      onDelete={notesStore.deleteNote}
    />
  );
});
