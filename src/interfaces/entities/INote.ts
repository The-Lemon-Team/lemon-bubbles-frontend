import { IDateRange } from '../ui/IDateRange';
import { IHashTag } from './IHashTag';

export interface INote {
  id: string;
  title: string;
  created: string;
  description: string;
  hashtags: IHashTag[];
}

export interface INoteEditForm extends Omit<INote, 'hashtags'> {
  hashtags: string[];
}

export interface INoteCreateForm extends Omit<INoteEditForm, 'id'> {}
export interface INoteCreateFormSubmit extends Omit<INote, 'id'> {}

export interface IGetNotesRequestDto {
  startDate: string;
  endDate: string;
}

export interface INotesService {
  createNote: (payload: INoteCreateFormSubmit) => Promise<INote>;
  editNote: (payload: INote) => Promise<INote>;
  findAll: (payload: IDateRange) => Promise<INote[]>;
  deleteNote: (id: string) => Promise<boolean>;
}
