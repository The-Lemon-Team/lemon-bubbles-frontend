import { IHashTag } from '../../../interfaces';

export interface ICreateHashtagStore {
  isCreatingMode: boolean;
  created: IHashTag[];
}
