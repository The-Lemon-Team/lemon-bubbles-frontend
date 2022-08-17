import { format } from 'date-fns';

import { authTransport } from '../../common/api';

import { INote } from '../../../interfaces';
import { INotesService } from '../interfaces';

export const notesService: INotesService = {
  createNote: (payload: Partial<INote>) => {
    return authTransport.put('/api/notes', payload);
  },
  loadNotes: (start: Date, end: Date): Promise<INote[]> => {
    return authTransport.get('/api/notes', {
      params: {
        start: format(start, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
        end: format(end, "yyyy-MM-dd'T'HH:mm:ss.SSS"),
      },
    });
  },
  deleteNote: (id: string) => {
    return authTransport.delete(`/api/notes/${id}`);
  },
  updateNote: ({ id, ...payload }: INote) => {
    return authTransport.patch(`/api/notes/${id}`, payload);
  },
};
