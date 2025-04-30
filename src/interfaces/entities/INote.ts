import { IDateRange } from '../ui/IDateRange';
import { IHashTag } from './IHashTag';

export interface INote {
  id: string;
  title: string;
  created: string;
  description: string;
  hashTags: IHashTag[];
}

export interface INoteEditForm extends Omit<INote, 'hashTags'> {
  hashTags: string[];
}

export interface INoteCreateForm extends Omit<INoteEditForm, 'id'> {}
export interface INoteCreateRequestDto extends Omit<INote, 'id'> {}

export interface IGetNotesRequestDto {
  dateRange?: IDateRange;
  take?: number;
  skip?: number;
}

export interface INotesService {
  createNote: (payload: INoteCreateRequestDto) => Promise<INote>;
  editNote: (payload: INote) => Promise<INote>;
  findAll: (payload: IGetNotesRequestDto) => Promise<INote[]>;
  findOne: (noteId: string) => Promise<INote>;
  deleteNote: (id: string) => Promise<boolean>;
  getNotesTotal: (payload?: IDateRange) => Promise<number>;
}
