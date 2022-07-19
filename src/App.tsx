import { RootStoreContext, rootStore } from './modules/common/stores/RootStore';
import { Header } from './components';
import { Board } from './modules/board';
import { ThemeProvider } from './modules/common/components';

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
