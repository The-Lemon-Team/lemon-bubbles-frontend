import { authTransport } from '../api';

import { IHashTagsService } from '../../../interfaces';

export const hashTagsService: IHashTagsService = {
  createHashTag: (payload) => authTransport.post('/api/hashtags', payload),
  editHashTag: (payload) => authTransport.patch('/api/hashtags', payload),
  findAll: () => authTransport.get('/api/hashtags'),
};
