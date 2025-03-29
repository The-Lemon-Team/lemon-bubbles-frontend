import { format, subWeeks } from 'date-fns';

const getDate = (date: Date | string | number | null) => {
  return date ? new Date(date) : new Date();
};

export const formatToIsoDate = (date: Date | string | number | null) =>
  format(getDate(date), "yyyy-MM-dd'T'HH:mm:ss.SSS");

export const getInitialDates = () => {
  const endDate = getDate(null).toString();
  const startDate = subWeeks(new Date(), 1).toString();

  return {
    startDate,
    endDate,
  };
};
