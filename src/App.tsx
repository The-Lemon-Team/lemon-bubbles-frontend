import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import { RootStoreContext, rootStore } from './modules/common/stores/RootStore';
import { Board } from './modules/board';
import { Header, ThemeProvider } from './modules/common/components';
import { Notifier } from './modules/common/components';

import { store } from './modules/common/redux/store';

export const App = () => {
  return (
    <StrictMode>
      <RootStoreContext.Provider value={rootStore}>
        <Provider store={store}>
          <ThemeProvider>
            <div>
              <Header />
              <Board />
            </div>
            <Notifier />
          </ThemeProvider>
        </Provider>
      </RootStoreContext.Provider>
    </StrictMode>
  );
};
