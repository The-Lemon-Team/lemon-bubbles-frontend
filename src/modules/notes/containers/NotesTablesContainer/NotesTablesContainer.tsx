import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useRootStore } from '../../../common/stores';

import { NotesTable } from '../../components';

export const NotesTablesContainer = observer(() => {
  const { notesStore, notesTable } = useRootStore();

  useEffect(() => {
    const status = notesStore.loading.getStatus();

    if (status !== 'loading' && status !== 'success') {
      notesStore.loadNotes();
    }
  }, [notesStore]);

  return (
    <NotesTable
      mode={notesTable.mode as 'table' | 'cards'}
      isCreatingMode={notesTable.isCreatingMode}
      notes={notesStore.getNotes()}
      isLoading={notesStore.loading.getIsLoading()}
      toggleCreatingMode={notesTable.toggleCreatingMode}
      onDelete={notesStore.deleteNote}
    />
  );
});
