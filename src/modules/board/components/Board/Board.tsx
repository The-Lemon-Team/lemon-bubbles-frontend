import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { NotesTablesContainer } from '../../containers';
import { FloatingList } from '../FloatingList';
import { MainLayout } from '../../../common/components/MainLayout';
import { ModalsManager } from '../ModalsManager';

import { useFeatureFlag } from '../../../common/hooks/useFeatureFlag';
import { useUser } from '../../../common/hooks/useUser';

export const Board = () => {
  const isFloatingWindowActivated = useFeatureFlag('floatingWindow');
  const navigate = useNavigate();
  const { user, isLoading, loadUserByToken } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      loadUserByToken()
        .unwrap()
        .catch(() => navigate('/'));
    }
  }, []);

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
