import { types } from 'mobx-state-tree';

import { HashtagStore } from './HashtagStore';

export const CreateHashtagStore = types
  .model({
    isCreatingMode: types.boolean,
    created: types.array(HashtagStore),
  })
  .actions((self) => {
    const switchOnCreatingMode = () => (self.isCreatingMode = true);
    const switchOffCreatingMode = () => (self.isCreatingMode = false);
    const toggleCreatingMode = () =>
      (self.isCreatingMode = !self.isCreatingMode);

    return {
      toggleCreatingMode,
      switchOnCreatingMode,
      switchOffCreatingMode,
    };
  });
