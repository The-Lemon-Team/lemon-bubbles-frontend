import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { INote, IDateRange, INoteFormSubmitValues } from '../../../interfaces';

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
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Notes', id }) as const),
              { type: 'Notes', id: 'LIST' },
            ]
          : [{ type: 'Notes', id: 'LIST' }],
    }),
    editNote: build.mutation<INote, INoteFormSubmitValues>({
      query: (payload) => ({
        url: '/notes' + `/${payload.id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Notes'],
    }),
    createNote: build.mutation<INote, INoteFormSubmitValues>({
      query: (payload) => ({
        url: '/notes',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
  }),
});

export const {
  useLazyLoadNotesQuery,
  useEditNoteMutation,
  useCreateNoteMutation,
} = notesApi;
