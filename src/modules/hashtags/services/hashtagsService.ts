import { colorGenerator } from '../utils/colorGenerator';

import { IHashTag } from '../../../interfaces';
import { IHashTagServices } from '../interfaces';

export const hashTagsService: IHashTagServices = {
  loadHashTags: () => {
    return Promise.resolve([
      {
        id: 'hashtag-1',
        color: colorGenerator(),
        text: 'Юнг',
        created: new Date().toString(),
      },
      {
        id: 'hashtag-2',
        color: colorGenerator(),
        text: 'Книги',
        created: new Date().toString(),
      },
      {
        id: 'hashtag-3',
        color: colorGenerator(),
        text: 'Проект',
        created: new Date().toString(),
      },
    ]);
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
