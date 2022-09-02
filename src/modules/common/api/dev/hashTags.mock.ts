import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';

import { IHashTag } from '../../../../interfaces';

export const generateHashTag = (fields: Partial<IHashTag> = {}) => ({
  id: uuid(),
  color: faker.color.rgb(),
  text: faker.word.verb(),
  created: new Date().toString(),
  ...fields,
});

const generateHashTags = (amount = 1) => {
  return Array.from(Array(amount)).map(generateHashTag);
};

export const hashTagsMock: IHashTag[] = generateHashTags(200);
export const findHashTag = (text: string) =>
  hashTagsMock.filter((tag) => tag.text.includes(text));
