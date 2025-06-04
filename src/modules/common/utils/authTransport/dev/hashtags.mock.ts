import { generateHashTag } from '../../generateHashTag';

import { IHashTag } from '../../../../../interfaces';

export const generateHashTags = (amount = 1) => {
  return Array.from(Array(amount)).map(generateHashTag);
};

export const hashtagsMock: IHashTag[] = generateHashTags(200);
export const findHashTag = (text: string) =>
  hashtagsMock.filter((tag) => tag.text.includes(text));
