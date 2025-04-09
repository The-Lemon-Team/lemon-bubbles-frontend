import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';
import { loadEntireStatistics as loadEntireStatisticsThunk } from '../stores/statisticsSlice';
import { generateNotes } from '../../common/api/dev/notes.mock';

import { INote } from '../../../interfaces';

export const useStatistics = () => {
  const dispatch = useAppDispatch();
  const loadEntireStatistics = () => {
    dispatch(loadEntireStatisticsThunk());
  };
  const hashTagsTop = useAppSelector(
    (state) => state.statistics.data.hashTagsTop,
  );
  // const lastNotes = useAppSelector((state) => state.statistics.data.lastNotes);
  const lastNotes = generateNotes(5);
  const loadStatus = useAppSelector((state) => state.statistics.loading.status);

  useEffect(() => {
    if (loadStatus === 'idle') {
      loadEntireStatistics();
    }
  }, [loadStatus]);

  return {
    hashTagsTop,
    lastNotes,
    // isLoading: loadStatus === 'loading',
    isLoading: true,
  };
};
