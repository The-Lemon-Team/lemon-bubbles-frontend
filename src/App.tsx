import { StrictMode } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import {
  AuthScreenContainer,
  PrivateRoute,
  Header,
  ThemeProvider,
  Notifier,
} from './modules/common/components';
import { RootStoreContext, rootStore } from './modules/common/stores/RootStore';
import { Board } from './modules/board';

export const App = () => {
  return (
    <StrictMode>
      <Router>
        <RootStoreContext.Provider value={rootStore}>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/board" />} />
              <Route
                path="/board"
                element={
                  <PrivateRoute>
                    <div>
                      <Header />
                      <Board />
                    </div>
                  </PrivateRoute>
                }
              />
              <Route path="/auth/*" element={<AuthScreenContainer />} />
            </Routes>
            <Notifier />
          </ThemeProvider>
        </RootStoreContext.Provider>
      </Router>
    </StrictMode>
  );
};
