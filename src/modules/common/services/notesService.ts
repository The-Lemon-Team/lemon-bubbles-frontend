import { authTransport } from '../api';

import { INotesService } from '../../../interfaces';

export const notesService: INotesService = {
  createNote: (payload) => authTransport.post('/api/notes', payload),
  editNote: (payload) =>
    authTransport.patch('/api/notes/' + payload.id, payload),
  findAll: ({ startDate, endDate }) => {
    return authTransport.get(
      `/api/notes/?startDate=${startDate}&endDate=${endDate}`,
    );
  },
  deleteNote: (id) => authTransport.delete('/api/notes/' + id),
};
