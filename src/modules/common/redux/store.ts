import { useMemo } from 'react';

import { configureStore, createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { dateRangeSlice } from '../stores';

import { IDateRange } from '../../../interfaces';

export interface IReduxState {
  dateRange: {
    start: string;
    end: string;
  };
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Notes', 'Hashtags'],
  endpoints: () => ({}),
});

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    dateRange: dateRangeSlice.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(baseApi.middleware),
});

const selectRootState = (state: IReduxState) => state;
export const selectDateRange = createSelector(
  selectRootState,
  (state) => state.dateRange,
);
export const { setDateRange } = dateRangeSlice.actions;

export const useActions = () => {
  const dispatch = useDispatch();
  const actions = useMemo(
    () => ({
      setDateRange: (dateRange: IDateRange) =>
        dispatch(setDateRange(dateRange)),
    }),
    [dispatch],
  );

  return actions;
};
