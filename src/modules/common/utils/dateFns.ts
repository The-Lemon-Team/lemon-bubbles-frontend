import { format, subWeeks } from 'date-fns';

import { IDateRange } from '../../../interfaces';

const getDate = (date: Date | string | number | null) => {
  return date ? new Date(date) : new Date();
};

export const formatToIsoDate = (date: Date | string | number | null) =>
  format(getDate(date), "yyyy-MM-dd'T'HH:mm:ss.SSS");

export const getInitialDates = (): IDateRange => {
  const endDate = getDate(null).toString();
  const startDate = subWeeks(new Date(), 1).toString();

  return {
    startDate,
    endDate,
  };
};

export const getLastWeek = (): IDateRange => getInitialDates();
export const displayDate = (date: string) =>
  format(new Date(date), '	dd.MM.yyyy');
