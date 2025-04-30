import { useDispatch, useSelector } from 'react-redux';
import type { IStore, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<IStore>();
