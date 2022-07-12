import React, { useCallback } from 'react';

import { AddNote } from '../../components';

import { INote, INoteForm } from '../../../../interfaces';
import { useRootStore } from '../../../common/stores';

interface AddNoteContainerProps {
  onAdd: (payload: INote) => void;
}

export const AddNoteContainer: React.FC<AddNoteContainerProps> = ({
  onAdd,
}) => {
  const { hashtagsStore } = useRootStore();
  const handleAdd = useCallback(
    (payload: INoteForm) => {
      console.log('trying to add a note');
      //   onAdd(payload);
    },
    [hashtagsStore.hashTags],
  );

  return <AddNote onAdd={handleAdd} />;
};
