import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../../common/stores';

import { NotesTable } from '../../components';
import { useFirebaseAuth } from '../../../firebase';

export const NotesTablesContainer = observer(() => {
  const { boardStore } = useRootStore();
  const { notesStore, notesTable } = boardStore;
  const { isLoading } = useFirebaseAuth();

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
      error={notesStore.loading.error}
      mode={notesTable.mode as 'table' | 'cards'}
      isFormEnabled={notesTable.isEnabled}
      notes={notesStore.getNotes()}
      isLoading={notesStore.loading.isLoading || isLoading}
      onDateChange={boardStore.loadNotes}
      toggleCreatingMode={notesTable.toggleCreatingMode}
      onEdit={notesTable.setEditMode}
      onDelete={notesStore.deleteNote}
      onRefresh={boardStore.reloadNotes}
    />
  );
});
