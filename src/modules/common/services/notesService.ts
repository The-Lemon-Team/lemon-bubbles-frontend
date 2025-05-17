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
  findAll: ({
    dateRange: { startDate, endDate } = {},
    pagination: { page, limit } = {},
  }) => {
    const seachParams = new URLSearchParams(
      _.omitBy(
        {
          startDate: startDate || '',
          endDate: endDate || '',
          limit: limit ? limit + '' : '',
          page: page ? page + '' : '',
        },
        (str) => {
          console.log('str', str);
          return !!str && +str !== 0;
        },
      ),
    );
    console.log(
      'seachParams',
      {
        startDate: startDate || '',
        endDate: endDate || '',
        limit: limit ? limit + '' : '',
        page: page ? page + '' : '',
      },
      seachParams.toString(),
    );
    return authTransport.get(`/api/notes/?` + seachParams);
  },
  deleteNote: (id) => authTransport.delete('/api/notes/' + id),
};
