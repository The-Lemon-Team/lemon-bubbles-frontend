import { IHashTag, IDateRange } from '../../../interfaces';

export interface IHashTagServices {
  createHashTag: (payload: Partial<IHashTag>) => Promise<IHashTag>;
  findHashTags: (
    text: string,
    options?: { excludeDateRange: IDateRange | null },
  ) => Promise<IHashTag[]>;
}
