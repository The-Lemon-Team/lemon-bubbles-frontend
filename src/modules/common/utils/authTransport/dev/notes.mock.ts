import { v4 as uuid } from 'uuid';
import { subHours } from 'date-fns';
import { faker } from '@faker-js/faker';
import { shuffle, take } from 'lodash';

import { formatToIsoDate } from '../../dateFns';
import { hashtagsMock } from './hashtags.mock';

import { INote } from '../../../../../interfaces';

export const generateNote = (fields: Partial<INote> = {}): INote => {
  const hashTags = take(shuffle(hashtagsMock), 5);
  const description = `${faker.hacker.phrase()} ${hashTags
    .map((hashtag) => `#${hashtag.text}`)
    .join(', ')}`;

  return {
    id: uuid(),
    title: `${faker.word.noun()} ${faker.word.adverb()}`,
    created: formatToIsoDate(subHours(new Date(), 5)),
    description,
    hashTags,
    ...fields,
  };
};

export const generateNoteObj = (
  fields: Partial<{
    title: string;
    description: string;
  }>,
) => {
  const note = generateNote(fields);

  return {
    description: note.description,
    title: note.title,
  };
};

export const generateNoteObjects = (amount = 1) => {
  return Array.from(Array(amount)).map(generateNoteObj);
};

export const generateNotes = (amount = 1) => {
  return Array.from(Array(amount)).map(generateNote);
};

export const notesMock: INote[] = generateNotes(5);
