import { useEffect } from 'react';

import { useLazyLoadNotesQuery } from '../api/notesApi';
import { useAppSelector } from '../../common/stores/hooks';
import { getInitialDates } from '../../common/utils';

export const useNotes = () => {
  const { startDate, endDate } = useAppSelector(
    (state) => state.board.dateRange,
  );
  const [loadNotes, { data, isLoading }] = useLazyLoadNotesQuery();

  useEffect(() => {
    if (startDate && endDate) {
      loadNotes({ endDate, startDate });
    }

    if (!startDate || !endDate) {
      const dates = getInitialDates();

      loadNotes({
        endDate: dates.endDate,
        startDate: dates.startDate,
      });
    }
  }, []);

  return {
    startDate,
    endDate,
    notes: data,
    isLoading,

    loadNotes,
  };
};
