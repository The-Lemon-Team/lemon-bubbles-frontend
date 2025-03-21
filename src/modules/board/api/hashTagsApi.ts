import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IHashTag } from '../../../interfaces';

export const hashTagsApi = createApi({
  reducerPath: 'hashtags',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['HashTags'],
  endpoints: (build) => ({
    getHashTagsByQuery: build.query<IHashTag[], string>({
      query: (query) => ({
        url: `/hashTags?query=` + query,
        method: 'GET',
      }),
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'HashTags', id })) : [],
    }),

    loadAllTags: build.query<IHashTag[], void>({
      query: () => ({
        url: '/hashTags',
        method: 'GET',
      }),
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'HashTags', id })) : [],
    }),
  }),
});

export const { useLazyGetHashTagsByQueryQuery, useLazyLoadAllTagsQuery } =
  hashTagsApi;
