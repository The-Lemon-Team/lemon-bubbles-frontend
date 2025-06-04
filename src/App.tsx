import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider, Notifier, store, persistor } from './modules/common';
import { AuthScreen } from './modules/auth';
import { AccessibleRoutes } from './pages';

import { AUTH_PATH } from './constants';

export const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <Routes>
              <Route
                path="/*"
                element={
                  <Routes>
                    <Route path="/" element={<Navigate to={AUTH_PATH} />} />
                    <Route path="/*" element={<AccessibleRoutes />} />
                  </Routes>
                }
              />
              <Route path={AUTH_PATH + '/*'} element={<AuthScreen />} />
            </Routes>
            <Notifier />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </Router>
  );
};
