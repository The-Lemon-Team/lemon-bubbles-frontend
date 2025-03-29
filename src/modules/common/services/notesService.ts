import { authTransport } from '../api';

import { INotesService } from '../../../interfaces';

export const notesService: INotesService = {
  findAll: ({ startDate, endDate }) => {
    return authTransport.get(
      `/api/notes/?startDate=${startDate}&endDate=${endDate}`,
    );
  },
};
