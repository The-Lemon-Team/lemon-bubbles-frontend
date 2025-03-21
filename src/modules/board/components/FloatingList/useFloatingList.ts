import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../common/stores/hooks';
import {
  setCoordinates as setCoordinatesAction,
  setSizes as setSizesAction,
} from '../../stores/boardSlice';

import { ICoordinates, ISizes } from '../../../../interfaces';

export const useFloatingList = () => {
  const dispatch = useDispatch();
  const setCoordinates = (payload: ICoordinates) =>
    dispatch(setCoordinatesAction(payload));
  const setSizes = (payload: ISizes) => dispatch(setSizesAction(payload));

  const coords = useAppSelector((state) => state.board.floatingList.coords);
  const sizes = useAppSelector((state) => state.board.floatingList.sizes);

  return {
    sizes,
    coords,

    setSizes,
    setCoordinates,
  };
};
