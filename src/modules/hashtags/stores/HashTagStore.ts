import { types } from 'mobx-state-tree';

export const HashtagStore = types.model('HashtagStore', {
  id: types.identifier,
  color: types.string,
  text: types.string,
  created: types.string,
});
