import { types, Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { subWeeks, startOfDay, endOfDay } from 'date-fns';

import { SettingsStore } from './SettingsStore';

import { BoardStore } from '../../board/stores';
import { ThemeMode } from '../../../enums';
import { NotesTableStore } from '../../notes/stores';
import { notifierStore } from './NotifierStore';
import { sizes, coordinates, featureFlags } from './appDefaults';

export const RootStore = types.model({
  settingsStore: SettingsStore,
  boardStore: BoardStore,
  notesTable: NotesTableStore,
});

export const rootStore = RootStore.create(
  {
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
        end: endOfDay(new Date()),
        start: startOfDay(subWeeks(new Date(), 1)),
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
  },
  { notifier: notifierStore },
);

export type RootInstance = Instance<typeof RootStore>;
export const RootStoreContext = createContext<RootInstance>(rootStore);

export const useRootStore = () => {
  return useContext(RootStoreContext);
};
