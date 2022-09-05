import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { AddNote } from '../../components';

import { useCreateNoteMutation } from '../../stores/notesApi';
import { useRootStore } from '../../../common/stores';
import { generateHashTag } from '../../../common/api/dev/hashTags.mock';

import { INote, INoteForm } from '../../../../interfaces';

interface AddNoteContainerProps {
  onAdd: (payload: INote) => void;
}

export const AddNoteContainer: React.FC<AddNoteContainerProps> = observer(
  () => {
    const [createNote, result] = useCreateNoteMutation();
    const { boardStore } = useRootStore();
    const { hashTagsStore } = boardStore;
    const handleAdd = useCallback(
      (payload: INoteForm) => {
        const [hashTags, unusedTags] = hashTagsStore.mapTagNamesOnTags(
          payload.hashTags,
        );
        const generatedTags = unusedTags.map((text) =>
          generateHashTag({ text, id: undefined }),
        );
        const newNote: INote = {
          ...payload,
          hashTags: [...hashTags, ...generatedTags],
        };

        createNote(newNote);
      },
      [hashTagsStore, boardStore, createNote],
    );

    return <AddNote onAdd={handleAdd} />;
  },
);
