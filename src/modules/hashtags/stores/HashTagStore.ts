import { types } from 'mobx-state-tree';

export const HashTagStore = types.model('HashTagStore', {
  id: types.identifier,
  color: types.string,
  text: types.string,
  created: types.string,
});
