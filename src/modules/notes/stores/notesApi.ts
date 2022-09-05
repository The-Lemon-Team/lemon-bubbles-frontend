import { baseApi } from '../../common/redux/store';

import { INote } from '../../../interfaces';

export const notesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotes: build.query({
      query: ({ start, end }: { start: string; end: string }) => {
        return {
          url: '/notes',
          params: {
            start,
            end,
          },
        };
      },
      providesTags: ['Notes'],
    }),

    createNote: build.mutation({
      query: (payload: Partial<INote>) => ({
        type: 'item',
        method: 'put',
        url: '/notes',
        body: payload,
      }),
      invalidatesTags: ['Notes'],
    }),

    deleteNote: build.mutation({
      query: (id: string) => ({
        type: 'item',
        method: 'delete',
        url: '/notes/' + id,
      }),
    }),
  }),
});

export const { useGetNotesQuery, useCreateNoteMutation } = notesApi;
