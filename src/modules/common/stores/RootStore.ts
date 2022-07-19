import { types, Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { BoardUIStore } from './BoardUIStore';
import { HashtagsStore } from '../../hashtags/stores/HashtagsStore';
import { ThemeMode } from '../../../enums';
import { sizes, coordinates, featureFlags } from './appDefaults';

export const RootStore = types.model({
  boardUIStore: BoardUIStore,
  hashtagsStore: HashtagsStore,
});

export const rootStore = RootStore.create({
  boardUIStore: {
    featureFlags: {
      features: featureFlags,
    },
    floatingList: {
      position: coordinates,
      sizes: sizes,
    },
    themeStore: {
      mode: ThemeMode.DARK,
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
