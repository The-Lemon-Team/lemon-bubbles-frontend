import { v4 as uuid } from 'uuid';
import { format, subHours } from 'date-fns';
import { faker } from '@faker-js/faker';
import { shuffle, take } from 'lodash';

import { hashTagsMock } from './hashTags.mock';

import { INote } from '../../../../interfaces';

export const generateNote = (fields: Partial<INote> = {}) => ({
  id: uuid(),
  color: faker.color.rgb(),
  title: `${faker.word.noun()} ${faker.word.adverb()}`,
  description: faker.hacker.phrase(),
  created: format(subHours(new Date(), 5), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
  hashTags: take(shuffle(hashTagsMock), 5),
  ...fields,
});

const generateNotes = (amount = 1) => {
  return Array.from(Array(amount)).map(generateNote);
};

export const notesMock: INote[] = generateNotes(20);
