import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { notesService } from '../../common/services/notesService';

import { INote, IDateRange, INoteFormSubmitValues } from '../../../interfaces';

export const notesApi = createApi({
  reducerPath: 'notes',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Notes'],
  endpoints: (build) => ({
    loadNotes: build.query<INote[], IDateRange>({
      queryFn: async (payload) => {
        return notesService
          .findAll(payload)
          .then((data) => ({ data }))
          .catch((error) => ({
            error,
          }));
      },
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
