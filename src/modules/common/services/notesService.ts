import _ from 'lodash';

import { authTransport } from '../utils/authTransport';

import { INotesService } from '../../../interfaces';

export const notesService: INotesService = {
  createNote: (payload) => authTransport.post('/api/notes', payload),
  editNote: (payload) =>
    authTransport.patch('/api/notes/' + payload.id, payload),
  getNotesTotal: (dateRange) => {
    if (dateRange) {
      const { startDate, endDate } = dateRange;

      return authTransport.get(
        '/api/notes/count?startDate=' + startDate + '&endDate=' + endDate,
      );
    }

    return authTransport.get('/api/notes/count');
  },
  findOne: (noteId) => authTransport.get('/api/notes/' + noteId),
  findAll: ({ dateRange: { startDate, endDate } = {}, take, skip }) => {
    const seachParams = new URLSearchParams(
      _.omitBy(
        {
          startDate: startDate || '',
          endDate: endDate || '',
          take: take ? take + '' : '',
          skip: skip ? skip + '' : '',
        },
        (str) => +str !== 0 && !str,
      ),
    );
    return authTransport.get(`/api/notes/?` + seachParams);
  },
  deleteNote: (id) => authTransport.delete('/api/notes/' + id),
};
