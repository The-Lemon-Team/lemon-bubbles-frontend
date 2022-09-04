import { StrictMode } from 'react';

import { RootStoreContext, rootStore } from './modules/common/stores/RootStore';
import { Board } from './modules/board';
import { Header, ThemeProvider } from './modules/common/components';
import { Notifier } from './modules/common/components';

export const App = () => {
  return (
    <StrictMode>
      <RootStoreContext.Provider value={rootStore}>
        <ThemeProvider>
          <div>
            <Header />
            <Board />
          </div>
          <Notifier />
        </ThemeProvider>
      </RootStoreContext.Provider>
    </StrictMode>
  );
};
