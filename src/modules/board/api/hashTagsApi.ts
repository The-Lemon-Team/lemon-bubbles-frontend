import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { hashTagsService } from '../../common/services/hashTagsService';

import { IHashTag } from '../../../interfaces';

export const hashTagsApi = createApi({
  reducerPath: 'hashtags',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['HashTags'],
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
  }),
});

export const { useLazyLoadAllTagsQuery } = hashTagsApi;
