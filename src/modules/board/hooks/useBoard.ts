import { setDate } from '../stores/boardSlice';

import { useAppDispatch, useAppSelector } from '../../common/stores/hooks';

export const useBoard = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.board.mode);

  const changeDate = (start: Date, end: Date) => {
    const dates = {
      endDate: start.toString(),
      startDate: end.toString(),
    };

    dispatch(setDate(dates));
  };

  return {
    mode,

    changeDate,
  };
};
