import React from 'react';

import { RootStoreContext, rootStore } from './modules/common/stores/RootStore';
import { Board, Header } from './components';

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
