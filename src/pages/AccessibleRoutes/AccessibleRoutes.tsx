import { Routes, Route } from 'react-router-dom';

import { Header, PrivateRoute } from '../../modules/common';
import { Board } from '../../modules/board';
import { ProfilePage } from '../../modules/profile';
import { UserStartup } from '../../modules/user';
import { NotesModals } from '../../modules/notes';

import { BOARD_PATH, PROFILE_PATH } from '../../constants';

export const AccessibleRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route
          path={BOARD_PATH}
          element={
            <div>
              <Header />
              <Board />
            </div>
          }
        />
        <Route
          path={PROFILE_PATH + '/*'}
          element={
            <div
              style={{
                height: '100%',
              }}
            >
              <Header />
              <ProfilePage />
            </div>
          }
        />
      </Routes>
      <UserStartup />
      <NotesModals />
    </PrivateRoute>
  );
};
