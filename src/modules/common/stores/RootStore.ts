import { types, Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { subDays } from 'date-fns';

import { BoardUIStore } from './BoardUIStore';
import { HashtagsStore } from '../../hashtags/stores/HashtagsStore';
import { ThemeMode } from '../../../enums';
import { NotesStore, NotesTableStore } from '../../notes/stores';
import { sizes, coordinates, featureFlags } from './appDefaults';

export const RootStore = types.model({
  boardUIStore: BoardUIStore,
  hashtagsStore: HashtagsStore,
  notesStore: NotesStore,
  notesTable: NotesTableStore,
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
  notesStore: {
    loading: {
      status: null,
    },
    dateRange: {
      end: new Date(subDays(new Date(), 1)),
      start: new Date(),
    },
    notes: [],
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
  notesTable: {
    isCreatingMode: false,
    mode: 'table',
  },
});

export type RootInstance = Instance<typeof RootStore>;
export const RootStoreContext = createContext<RootInstance>(rootStore);

export const useRootStore = () => {
  return useContext(RootStoreContext);
};
