import _ from 'lodash';

import { authTransport } from '../../common/utils/authTransport';

import { IHashTagsService } from '../../../interfaces';

export const hashTagsService: IHashTagsService = {
  createHashTag: (payload) => authTransport.post('/api/hashtags', payload),
  editHashTag: (payload) => authTransport.patch('/api/hashtags', payload),
  findAll: () =>
    authTransport.get('/api/hashtags').catch((err) => {
      throw err.response.data;
    }),

  findWithNotes: ({ limit, dateRange: { startDate, endDate } = {} }) => {
    console.log('findWithNotes');
    const searchParams = new URLSearchParams(
      _.omitBy(
        {
          startDate: startDate || '',
          endDate: endDate || '',
          limit: limit + '',
        },
        _.isNil,
      ),
    );

    return authTransport.get('/api/hashTags/withNotes?' + searchParams);
  },
};
