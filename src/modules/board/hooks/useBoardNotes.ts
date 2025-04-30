import { useEffect } from 'react';

import { useLoadNotesQuery } from '../../notes/api/notesApi';
import { useInfiniteAssets } from '../../common/hooks';

import { IDateRange } from '../../../interfaces';

export const useBoardNotes = (dateRange?: IDateRange) => {
  const { take, skip } = useInfiniteAssets();
  // @todo убрать lazy
  const { data: notes, isLoading } = useLoadNotesQuery({
    dateRange,
    take,
    skip,
  });

  return {
    notes,
    isLoading,
  };
};
