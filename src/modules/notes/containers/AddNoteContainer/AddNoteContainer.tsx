import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { AddNote } from '../../components';

import { INote, INoteForm } from '../../../../interfaces';
import { useRootStore } from '../../../common/stores';

interface AddNoteContainerProps {
  onAdd: (payload: INote) => void;
}

export const AddNoteContainer: React.FC<AddNoteContainerProps> = observer(
  ({ onAdd }) => {
    const { hashtagsStore, notesStore } = useRootStore();
    const handleAdd = useCallback(
      (payload: INoteForm) => {
        const [hashTags] = hashtagsStore.mapTagNamesOnTags(payload.hashTags);
        const newNote: INote = {
          ...payload,
          hashTags,
        };

        notesStore.addNote(newNote);
        onAdd(newNote);
      },
      [onAdd, hashtagsStore, notesStore],
    );

    return <AddNote onAdd={handleAdd} />;
  },
);
