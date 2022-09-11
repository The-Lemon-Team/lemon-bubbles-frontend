import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { CreateNote } from '../../components';

import { useRootStore } from '../../../common/stores/RootStore';
import { useHashTagAdapter } from './useHashTagAdapter';

import { INote, INoteForm } from '../../../../interfaces';

interface CreateNoteContainerProps {
  onAdd: (payload: INote) => void;
}

export const CreateNoteContainer: React.FC<CreateNoteContainerProps> = observer(
  () => {
    const { boardStore } = useRootStore();
    const { notesTable } = boardStore;
    const { transformTags } = useHashTagAdapter();

    const handleAdd = useCallback(
      (payload: INoteForm) => {
        const hashTags = transformTags(payload.hashTags);
        const newNote: INote = {
          ...payload,
          hashTags,
        };

        boardStore.addNote(newNote);
      },
      [transformTags, boardStore],
    );
    const handleSubmit = useCallback(
      (payload: INoteForm) => {
        if (notesTable.isCreatingMode) {
          handleAdd(payload);
        }

        if (notesTable.isEditingMode) {
          const hashTags = transformTags(payload.hashTags);
          const note = {
            ...payload,
            hashTags,
          };

          boardStore.editNote(note);
        }
      },
      [notesTable, handleAdd, transformTags, boardStore],
    );

    return (
      <CreateNote
        selectedToEdit={notesTable.selectedToEdit}
        onSubmit={handleSubmit}
        onReset={notesTable.resetEditMode}
      />
    );
  },
);
