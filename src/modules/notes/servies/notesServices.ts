import { formatToIsoDate } from '../../common/utils';
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
        start: formatToIsoDate(start),
        end: formatToIsoDate(end),
      },
    });
  },
  deleteNote: (id: string) => {
    return authTransport.delete(`/api/notes/${id}`);
  },
  updateNote: (payload: INote) => {
    return authTransport.patch(`/api/notes/${payload.id}`, payload);
  },
};
