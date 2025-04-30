import { IDateRange } from '../ui/IDateRange';
import { INote } from './INote';

export interface IHashTagData {
  color: string;
  text: string;
}

export interface IHashTag extends IHashTagData {
  id: string;
  created: string;
}

export interface IHashTagWithNotes extends IHashTag {
  notes: INote[];
}

export interface IHashTagFindWithNotesRequestDto {
  limit?: number;
  dateRange?: IDateRange;
}

export interface IHashTagsService {
  createHashTag: (payload: IHashTagData) => Promise<IHashTag>;
  editHashTag: (payload: IHashTag) => Promise<IHashTag>;
  findAll: () => Promise<IHashTag[]>;
  findWithNotes: (
    payload: IHashTagFindWithNotesRequestDto,
  ) => Promise<IHashTagWithNotes[]>;
}
