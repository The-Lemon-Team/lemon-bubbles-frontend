import { NotesTablesContainer } from '../../containers';
import { FloatingList } from '../FloatingList';
import { MainLayout } from '../../../common/components/MainLayout';
import { ModalsManager } from '../ModalsManager';

import { usePrivateRoute, useFeatureFlag } from '../../../common/hooks';

export const Board = () => {
  const isFloatingWindowActivated = useFeatureFlag('floatingWindow');

  usePrivateRoute();

  return (
    <MainLayout
      content={<NotesTablesContainer />}
      additional={
        <>
          {isFloatingWindowActivated && <FloatingList />}
          <ModalsManager />
        </>
      }
    />
  );
};
