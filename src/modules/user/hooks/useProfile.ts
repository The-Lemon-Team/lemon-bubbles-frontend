import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import { loadProfileStatistics } from '../stores/statisticsSlice';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector((state) => state.statistics.loading.status);
  const top5HashTags = useAppSelector(
    (state) => state.statistics.data.top5HashTags,
  );
  const notesCount = useAppSelector(
    (state) => state.statistics.data.notesCount,
  );

  useEffect(() => {
    if (loadStatus === 'idle') {
      dispatch(loadProfileStatistics());
    }
  }, [loadStatus]);

  return { isLoading: loadStatus === 'loading', top5HashTags, notesCount };
};
