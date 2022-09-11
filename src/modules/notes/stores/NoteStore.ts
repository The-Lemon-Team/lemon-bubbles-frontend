import { castToSnapshot, types } from 'mobx-state-tree';
import { INote } from '../../../interfaces';

import { HashTagStore } from '../../hashtags/stores';

export const NoteStore = types
  .model('NoteStore', {
    id: types.identifier,
    title: types.string,
    created: types.string,
    description: types.string,
    hashTags: types.array(HashTagStore),
  })
  .actions((self) => ({
    updateNote({ id, title, created, description, hashTags }: INote) {
      self.id = id;
      self.title = title;
      self.created = created;
      self.description = description;
      self.hashTags = castToSnapshot(hashTags);
    },
  }));
