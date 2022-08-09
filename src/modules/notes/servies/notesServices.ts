import { subDays } from 'date-fns';
import { INote } from '../../../interfaces';

export const notesService = {
  loadNotes(): Promise<INote[]> {
    return Promise.resolve([
      {
        id: '1',
        title: 'Title #1',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`,
        created: subDays(new Date(), 2).toString(),
        hashTags: [
          {
            id: 'h-1',
            created: new Date().toString(),
            text: 'Пожрал',
            color: '#1976d2',
          },
        ],
      },
      {
        id: '2',
        title: 'Title Title Title Title #2 e Title Title #2  ',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters',
        created: new Date().toString(),
        hashTags: [
          {
            id: 'h-3233',
            created: new Date().toString(),
            text: 'Пожрал',
            color: '#42a5f5',
          },
          {
            id: 'h-4112',
            created: new Date().toString(),
            text: 'посрал',
            color: '#42a5f5',
          },
        ],
      },
      {
        id: '2',
        title: 'Title Title Title Title #2 e Title Title #2  ',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters',
        created: new Date().toString(),
        hashTags: [
          {
            id: 'h-3233',
            created: new Date().toString(),
            text: 'Пожрал',
            color: '#42a5f5',
          },
          {
            id: 'h-4112',
            created: new Date().toString(),
            text: 'посрал',
            color: '#42a5f5',
          },
        ],
      },
    ]);
  },
};
