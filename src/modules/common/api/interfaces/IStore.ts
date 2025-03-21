import { ThemeMode } from '../../../../enums';
import {
  IUser,
  ILoadingState,
  IDateRange,
  ICoordinates,
  ISizes,
  INotification,
} from '../../../../interfaces';

export interface ICommonStore {
  featureFlags: { [key: string]: boolean };
  theme: ThemeMode;
}

export interface INotifierStore {
  notifications: INotification[];
}

export interface IUserStore {
  data: IUser | null;
  loading: ILoadingState;
  create: ILoadingState;
}

export interface IFloatingList {
  coords: ICoordinates;
  sizes: ISizes;
}

export interface IBoardStore {
  mode: 'table' | 'cards';
  isCreatingMode: boolean;
  editId?: string;
  deleteId?: string;
  dateRange: IDateRange;
  floatingList: IFloatingList;
}

export interface IStore {
  user: IUserStore;
  board: IBoardStore;
  common: ICommonStore;
}
