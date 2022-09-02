import { types } from 'mobx-state-tree';

import { HashTagStore } from '../../hashtags/stores';

export const NoteStore = types.model('NoteStore', {
  id: types.identifier,
  title: types.string,
  created: types.string,
  description: types.string,
  hashTags: types.array(HashTagStore),
});
