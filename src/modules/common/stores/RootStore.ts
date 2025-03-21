import { types, Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { notifierStore } from './NotifierStore';

export const RootStore = types.model({});

export const rootStore = RootStore.create({}, { notifier: notifierStore });

export type RootInstance = Instance<typeof RootStore>;
export const RootStoreContext = createContext<RootInstance>(rootStore);

export const useRootStore = () => {
  return useContext(RootStoreContext);
};
