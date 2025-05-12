import { useLoadNotesQuery } from '../../notes/api/notesApi';
import { useInfiniteAssets } from '../../common/hooks';

import { IDateRange } from '../../../interfaces';

export const useBoardNotes = (dateRange?: IDateRange) => {
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
    meta: {
      page,
      limit,
      totalItems: data?.meta?.totalItems,
    },
    setPage,
  };
};
