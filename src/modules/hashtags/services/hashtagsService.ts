import { authTransport } from '../../common/api';

import { IHashTag } from '../../../interfaces';
import { IHashTagServices } from '../interfaces';

export const hashTagsService: IHashTagServices = {
  // loadHashTags: () => {
  //   return authTransport.get('/api/notes');
  // },
  findHashTags: (
    text: string,
    { excludeDateRange } = { excludeDateRange: null },
  ) => {
    return authTransport.get('/api/hashTags/', {
      params: { text, excludeDateRange },
    });
  },
  createHashTag: (payload: Partial<IHashTag>) => {
    return Promise.resolve({
      ...payload,
      color: payload.color || '#000',
      text: payload.text || '',
      created: payload.created || new Date().toString(),
      id: 'h-1',
    });
  },
};
