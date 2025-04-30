import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { notesService } from '../../common/services';

import { IDateRange } from '../../../interfaces';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Notes'],
  endpoints: (build) => ({
    getNotesCount: build.query<number, void>({
      queryFn: async () => {
        return notesService
          .getNotesTotal()
          .then((data) => ({ data }))
          .catch((error) => ({
            error,
          }));
      },
    }),
    getPeriodNotesCount: build.query<number, IDateRange>({
      queryFn: (dateRange) => {
        return notesService
          .getNotesTotal(dateRange)
          .then((data) => ({ data }))
          .catch((error) => ({
            error,
          }));
      },
    }),
  }),
});

export const { useGetNotesCountQuery, useGetPeriodNotesCountQuery } =
  profileApi;
