import { types, Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { BoardUIStore } from './BoardUIStore';
import { HashtagsStore } from '../../hashtags/stores/HashtagsStore';

export const RootStore = types.model({
  boardUIStore: BoardUIStore,
  hashtagsStore: HashtagsStore,
});

const DEFAULT_X_POSITION = 300;
const DEFAULT_Y_POSITION = 150;

export const rootStore = RootStore.create({
  boardUIStore: {
    floatingList: {
      position: {
        x: DEFAULT_X_POSITION,
        y: DEFAULT_Y_POSITION,
      },
      sizes: {
        width: 350,
        height: 350,
      },
    },
  },
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
