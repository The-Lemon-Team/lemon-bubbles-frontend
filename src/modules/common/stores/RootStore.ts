import { types, Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { HashtagsStore } from '../../hashtags/stores/HashtagsStore';

export const RootStore = types.model({
  hashtagsStore: HashtagsStore,
});

export const rootStore = RootStore.create({
  hashtagsStore: {
    hashTags: [
      {
        id: 'h-1',
        created: new Date().toString(),
        text: 'Пожрал',
        color: '#1976d2',
      },
      {
        id: 'h-3233',
        created: new Date().toString(),
        text: 'Почитал',
        color: '#42a5f5',
      },
      {
        id: 'h-4112',
        created: new Date().toString(),
        text: 'Посрал',
        color: '#fcc690',
      },
    ],
  },
});

export type RootInstance = Instance<typeof RootStore>;
export const RootStoreContext = createContext<RootInstance>(rootStore);

export const useRootStore = () => {
  return useContext(RootStoreContext);
};
