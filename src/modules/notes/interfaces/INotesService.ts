import { INote } from '../../../interfaces';

export interface INotesService {
  createNote: (payload: Partial<INote>) => Promise<INote>;
  loadNotes: (start: Date, end: Date) => Promise<INote[]>;
  deleteNote: (id: string) => Promise<boolean>;
  updateNote: (note: INote) => Promise<INote>;
}
