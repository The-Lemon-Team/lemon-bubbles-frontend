import { IDateRange } from '../ui/IDateRange';
import { IHashTag } from './IHashTag';

export interface INote {
  id: string;
  title: string;
  created: string;
  description: string;
  hashtags: IHashTag[];
}

export interface INoteForm extends Omit<INote, 'hashtags'> {
  hashtags: string[];
}

export interface IGetNotesRequestDto {
  startDate: string;
  endDate: string;
}

export interface INoteFormikValues extends Partial<INoteForm> {}

export interface INoteFormSubmitValues extends Omit<INote, 'id' | 'created'> {
  id?: string;
  created?: string;
}

export interface INotesService {
  findAll: (payload: IDateRange) => Promise<INote[]>;
}
