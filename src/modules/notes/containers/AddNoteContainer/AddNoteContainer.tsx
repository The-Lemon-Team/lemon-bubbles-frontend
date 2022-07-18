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
    const { hashtagsStore } = useRootStore();
    const handleAdd = useCallback(
      (payload: INoteForm) => {
        const [hashTags] = hashtagsStore.mapTagNamesOnTags(payload.hashTags);
        const newNote: INote = {
          ...payload,
          hashTags,
        };

        onAdd(newNote);
      },
      [onAdd, hashtagsStore],
    );

    return <AddNote onAdd={handleAdd} />;
  },
);
