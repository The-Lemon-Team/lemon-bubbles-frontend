import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { notesService } from '../../common/services/notesService';

import { INote, IDateRange, INoteCreateFormSubmit } from '../../../interfaces';

export const notesApi = createApi({
  reducerPath: 'notes',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Notes', 'HashTags'],
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
    editNote: build.mutation<INote, INote>({
      queryFn: (note) => {
        return notesService
          .editNote(note)
          .then((data) => ({ data }))
          .catch((error) => ({ error }));
      },
      invalidatesTags: ['Notes'],
    }),
    createNote: build.mutation<INote, INoteCreateFormSubmit>({
      queryFn: (payload) => {
        return notesService
          .createNote(payload)
          .then((data) => ({ data }))
          .catch((error) => ({
            error,
          }));
      },
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
    }),
  }),
});

export const {
  useLazyLoadNotesQuery,
  useEditNoteMutation,
  useCreateNoteMutation,
} = notesApi;
