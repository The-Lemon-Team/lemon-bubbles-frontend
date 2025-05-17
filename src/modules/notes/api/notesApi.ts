import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { notesService } from '../../common/services/notesService';

import {
  INote,
  IGetNotesResponseDto,
  IGetNotesRequestDto,
  INoteCreateRequestDto,
} from '../../../interfaces';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Notes', 'HashTags'],
  endpoints: (build) => ({
    loadNote: build.query<INote, string>({
      queryFn: async (noteId) => {
        return notesService
          .findOne(noteId)
          .then((data) => ({ data }))
          .catch((error) => ({ error }));
      },
    }),
    loadNotes: build.query<IGetNotesResponseDto, IGetNotesRequestDto>({
      queryFn: async (payload) => {
        return notesService
          .findAll(payload)
          .then((payload) => ({ data: payload }))
          .catch((error) => ({ error }));
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Notes', id }) as const),
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
      invalidatesTags: (result, error, arg) => [{ type: 'Notes', id: arg.id }],
    }),
    createNote: build.mutation<INote, INoteCreateRequestDto>({
      queryFn: (payload) => {
        return notesService
          .createNote(payload)
          .then((data) => ({ data }))
          .catch((error) => ({
            error,
          }));
      },
      invalidatesTags: () => ['Notes'],
    }),
    deleteNote: build.mutation<boolean, string>({
      queryFn: (id) => {
        return notesService
          .deleteNote(id)
          .then((data) => ({ data }))
          .catch((error) => ({ error }));
      },
      invalidatesTags: (result, error, id) => [{ type: 'Notes', id }],
    }),
  }),
});

export const {
  useLazyLoadNotesQuery,
  useLazyLoadNoteQuery,
  useEditNoteMutation,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useLoadNotesQuery,
} = notesApi;
