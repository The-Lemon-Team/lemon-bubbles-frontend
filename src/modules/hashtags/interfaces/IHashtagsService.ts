import { IHashTag } from '../../../interfaces';

export interface IHashTagServices {
  createHashTag: (payload: Partial<IHashTag>) => Promise<IHashTag>;
  loadHashTags: () => Promise<IHashTag[]>;
}
