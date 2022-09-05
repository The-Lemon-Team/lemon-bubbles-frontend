import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { subWeeks, startOfDay, endOfDay } from 'date-fns';

import { formatToIsoDate } from '../../notes/utils/formatToIsoDate';

import { IDateRange } from '../../../interfaces';

export const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState: {
    end: formatToIsoDate(endOfDay(new Date())),
    start: formatToIsoDate(startOfDay(subWeeks(new Date(), 1))),
  },
  reducers: {
    setDateRange(
      state,
      { payload: { start, end } }: PayloadAction<IDateRange>,
    ) {
      return {
        start: formatToIsoDate(start),
        end: formatToIsoDate(end),
      };
    },
  },
});
