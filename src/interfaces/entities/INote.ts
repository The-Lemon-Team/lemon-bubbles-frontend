import { IDateRange } from '../ui/IDateRange';
import { IPagination, IPaginationDto } from '../ui/IPagination';
import { IHashTag } from './IHashTag';

export interface INoteObj {
  title: string;
  description: string;
}

export interface INote extends INoteObj {
  id: string;
  created: string;
  hashTags: IHashTag[];
}

export interface INoteEditForm extends Omit<INote, 'hashTags'> {
  hashTags: string[];
}

export interface INoteCreateForm extends Omit<INoteEditForm, 'id'> {}
export interface INoteCreateRequestDto extends Omit<INote, 'id'> {}

export interface IGetNotesRequestDto {
  dateRange?: IDateRange;
  pagination?: IPagination;
}

export interface IGetNotesResponseDto {
  items: INote[];
  meta: IPaginationDto;
}

export interface INotesService {
  createNote: (payload: INoteCreateRequestDto) => Promise<INote>;
  editNote: (payload: INote) => Promise<INote>;
  findAll: (payload: IGetNotesRequestDto) => Promise<IGetNotesResponseDto>;
  findOne: (noteId: string) => Promise<INote>;
  deleteNote: (id: string) => Promise<boolean>;
  getNotesTotal: (payload?: IDateRange) => Promise<number>;
}
