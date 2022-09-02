import { types, Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { subDays } from 'date-fns';

import { SettingsStore } from './SettingsStore';

import { BoardStore } from '../../board/stores';
import { ThemeMode } from '../../../enums';
import { NotesTableStore } from '../../notes/stores';
import { sizes, coordinates, featureFlags } from './appDefaults';

export const RootStore = types.model({
  settingsStore: SettingsStore,
  boardStore: BoardStore,
  notesTable: NotesTableStore,
});

export const rootStore = RootStore.create({
  settingsStore: {
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
  boardStore: {
    dateRange: {
      end: new Date(subDays(new Date(), 1)),
      start: new Date(),
    },
    notesStore: {
      loading: {
        status: null,
      },
      notes: [],
    },
    hashTagsStore: {
      heap: [],
      searchValue: null,
      loading: {
        status: null,
      },
    },
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
