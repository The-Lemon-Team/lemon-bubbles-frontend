import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../../common/stores';

import { NotesTable } from '../../components';

export const NotesTablesContainer = observer(() => {
  const { notesStore, notesTable } = useRootStore();

  useEffect(() => {
    const dateRange = notesStore.dateRange.getDateRange();
    const status = notesStore.loading.status;

    if (!['loading', 'success'].includes(status || '')) {
      notesStore.loadNotes(dateRange.start, dateRange.end);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotesTable
      dateRange={{
        start: notesStore.dateRange.start,
        end: notesStore.dateRange.end,
      }}
      mode={notesTable.mode as 'table' | 'cards'}
      isCreatingMode={notesTable.isCreatingMode}
      notes={notesStore.getNotes()}
      isLoading={notesStore.loading.getIsLoading()}
      onDateChange={notesStore.dateRange.setDateRange}
      toggleCreatingMode={notesTable.toggleCreatingMode}
      onDelete={notesStore.deleteNote}
    />
  );
});
