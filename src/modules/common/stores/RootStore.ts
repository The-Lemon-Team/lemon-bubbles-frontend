import { types, Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { CreateHashtagStore } from '../../hashtags/stores/CreateHashtagStore';
import { HashtagsStore } from '../../hashtags/stores/HashtagsStore';

export const RootStore = types.model({
  createHashtagStore: CreateHashtagStore,
  hashtagsStore: HashtagsStore,
});

export const rootStore = RootStore.create({
  createHashtagStore: {
    isCreatingMode: false,
    created: [],
  },
  hashtagsStore: {
    hashTags: [],
  },
});

export type RootInstance = Instance<typeof RootStore>;
export const RootStoreContext = createContext<RootInstance>(rootStore);

export const useRootStore = () => {
  return useContext(RootStoreContext);
};
