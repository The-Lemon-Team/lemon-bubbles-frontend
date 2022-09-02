import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { AddNote } from '../../components';

import { INote, INoteForm } from '../../../../interfaces';
import { useRootStore } from '../../../common/stores';
import { generateHashTag } from '../../../common/api/dev/hashTags.mock';

interface AddNoteContainerProps {
  onAdd: (payload: INote) => void;
}

export const AddNoteContainer: React.FC<AddNoteContainerProps> = observer(
  () => {
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

        boardStore.addNote(newNote);
      },
      [hashTagsStore, boardStore],
    );

    return <AddNote onAdd={handleAdd} />;
  },
);
