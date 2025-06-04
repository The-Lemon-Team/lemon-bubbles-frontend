import { useInfiniteAssets } from '../../common';
import { useLoadNotesQuery } from '../api/notesApi';

import { IDateRange } from '../../../interfaces';

export const useNotes = (dateRange?: IDateRange) => {
  const { page, limit, setPage } = useInfiniteAssets();
  const { data, isLoading } = useLoadNotesQuery({
    dateRange,
    pagination: {
      page,
      limit,
    },
  });

  return {
    isLoading,
    notes: data?.items || [],
    pagination: {
      page,
      limit,
      totalItems: data?.meta?.totalItems,
    },
    setPage,
  };
};
