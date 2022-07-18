import React from 'react';

import { RootStoreContext, rootStore } from './modules/common/stores/RootStore';
import { Header } from './components';
import { Board } from './modules/board';

export const App = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <div>
        <Header />
        <Board />
      </div>
    </RootStoreContext.Provider>
  );
};
