import { format } from 'date-fns';

import { INote } from '../../../interfaces';

export const groupNotesByDays = (notes: INote[]) => {
  return notes.reduce((result, cur) => {
    const formattedDate = format(new Date(cur.created), 'd MMM Y');

    return {
      ...result,
      [formattedDate]: result[formattedDate]
        ? [...result[formattedDate], cur]
        : [cur],
    };
  }, {} as { [key: string]: INote[] });
};
