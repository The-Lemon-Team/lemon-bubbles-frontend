import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { INote, IDateRange } from '../../../interfaces';

export const notesApi = createApi({
  reducerPath: 'notes',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Notes'],
  endpoints: (build) => ({
    loadNotes: build.query<INote[], IDateRange>({
      query: ({ endDate, startDate }) => ({
        url: `/notes`,
        method: 'POST',
        body: { startDate, endDate },
      }),
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Notes', id })) : [],
    }),
  }),
});

export const { useLazyLoadNotesQuery } = notesApi;
