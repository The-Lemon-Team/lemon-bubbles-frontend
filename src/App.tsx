import { StrictMode } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {
  AuthScreen,
  Header,
  ThemeProvider,
  Notifier,
  StartupActions,
} from './modules/common/components';
import { Board } from './modules/board';

import { store, persistor } from './modules/common/stores';

export const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StartupActions>
            <ThemeProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/auth" />} />
                <Route
                  path="/board"
                  element={
                    <div>
                      <Header />
                      <Board />
                    </div>
                  }
                />
                <Route path="/auth/*" element={<AuthScreen />} />
              </Routes>
              <Notifier />
            </ThemeProvider>
          </StartupActions>
        </PersistGate>
      </Provider>
    </Router>
  );
};
