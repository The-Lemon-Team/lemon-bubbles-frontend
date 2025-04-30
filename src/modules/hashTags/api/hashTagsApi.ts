import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { hashTagsService } from '../services/hashTagsService';

import {
  IHashTag,
  IHashTagWithNotes,
  IHashTagFindWithNotesRequestDto,
} from '../../../interfaces';

export const hashTagsApi = createApi({
  reducerPath: 'hashTags',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['HashTags', 'HashTagsWithNotes'],
  endpoints: (build) => ({
    loadAllTags: build.query<IHashTag[], void>({
      queryFn: async () => {
        return hashTagsService
          .findAll()
          .then((data) => ({ data }))
          .catch((error) => ({
            error,
          }));
      },
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'HashTags', id })) : [],
    }),
    loadTagsWithNotes: build.query<
      IHashTagWithNotes[],
      IHashTagFindWithNotesRequestDto
    >({
      queryFn: async (payload) => {
        console.log('payload', payload);
        return hashTagsService
          .findWithNotes(payload)
          .then((data) => ({ data }))
          .catch((error) => ({ error }));
      },
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'HashTagsWithNotes', id }))
          : [],
    }),
  }),
});

export const {
  useLoadAllTagsQuery,
  useLazyLoadAllTagsQuery,
  useLazyLoadTagsWithNotesQuery,
  useLoadTagsWithNotesQuery,
} = hashTagsApi;
