import { types } from 'mobx-state-tree';
import { differenceInDays, subDays } from 'date-fns';

import { defaultDateRange } from './appDefaults';

export const DateRangeStore = types.snapshotProcessor(
  types
    .model('DatesStore', {
      start: types.Date,
      end: types.Date,
    })
    .views((self) => ({
      getDateRange() {
        return {
          start: self.start,
          end: self.end,
        };
      },
    }))
    .actions((self) => ({
      setDateRange(start: Date, end: Date) {
        self.end = end;
        self.start = start;
      },
    })),
  {
    preProcessor() {
      const storageItem = localStorage.getItem('dateRange');
      const restoredDate = storageItem && JSON.parse(storageItem);
      const dayRange =
        restoredDate &&
        differenceInDays(
          new Date(restoredDate.end),
          new Date(restoredDate.start),
        );

      return restoredDate
        ? {
            start: new Date(subDays(new Date(), dayRange)),
            end: new Date(),
          }
        : defaultDateRange;
    },
    postProcessor(snapshot) {
      localStorage.setItem('dateRange', JSON.stringify(snapshot));
      return snapshot;
    },
  },
);
