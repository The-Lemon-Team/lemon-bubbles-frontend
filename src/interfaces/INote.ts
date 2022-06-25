import { IHashTag } from './IHashTag';

export interface INote {
  id: string;
  created: string;
  description: string;
  hashTags: IHashTag[];
}
