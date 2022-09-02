import { types } from 'mobx-state-tree';

export const DateRangeStore = types
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
  }));
