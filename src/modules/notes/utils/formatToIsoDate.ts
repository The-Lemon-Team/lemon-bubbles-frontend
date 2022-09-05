import { format } from 'date-fns';

export const formatToIsoDate = (date: string | Date) =>
  format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss.SSS");
