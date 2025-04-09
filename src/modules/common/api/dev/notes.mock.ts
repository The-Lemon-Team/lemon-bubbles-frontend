import { v4 as uuid } from 'uuid';
import { subHours } from 'date-fns';
import { faker } from '@faker-js/faker';
import { shuffle, take } from 'lodash';

import { formatToIsoDate } from '../../utils';
import { hashtagsMock } from './hashtags.mock';

import { INote } from '../../../../interfaces';

export const generateNote = (fields: Partial<INote> = {}) => {
  const hashTags = take(shuffle(hashtagsMock), 5);
  const description = `${faker.hacker.phrase()} ${hashTags
    .map((hashtag) => `#${hashtag.text}`)
    .join(', ')}`;

  return {
    id: uuid(),
    color: faker.color.rgb(),
    title: `${faker.word.noun()} ${faker.word.adverb()}`,
    created: formatToIsoDate(subHours(new Date(), 5)),
    description,
    hashTags,
    ...fields,
  };
};

export const generateNotes = (amount = 1) => {
  return Array.from(Array(amount)).map(generateNote);
};

export const notesMock: INote[] = generateNotes(5);
