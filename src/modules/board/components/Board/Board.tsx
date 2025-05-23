import { lazy, Suspense } from 'react';
import { MainLayout } from '../../../common';

import { useBoard } from '../../hooks/useBoard';

export const Board = () => {
  const { mode, changeDate } = useBoard();

  const NotesTablesContainer = lazy(
    () => import('../../../notes/containers/NotesTableContainer'),
  );

  return (
    <MainLayout
      content={
        <Suspense fallback={<div>loading...</div>}>
          <NotesTablesContainer
            mode={mode as 'table' | 'cards'}
            onDateChange={changeDate}
          />
        </Suspense>
      }
    />
  );
};
