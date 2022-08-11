import { RootStoreContext, rootStore } from './modules/common/stores/RootStore';
import { Board } from './modules/board';
import { Header, ThemeProvider } from './modules/common/components';

export const App = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <ThemeProvider>
        <div>
          <Header />
          <Board />
        </div>
      </ThemeProvider>
    </RootStoreContext.Provider>
  );
};
