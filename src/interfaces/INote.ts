import { IHashTag } from './IHashTag';

export interface INote {
  id: string;
  title: string;
  created: string;
  description: string;
  hashTags: IHashTag[];
}
