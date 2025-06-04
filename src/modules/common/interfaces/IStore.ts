import { ThemeMode } from '../../../enums';
import {
  IUser,
  ILoadingState,
  IDateRange,
  ICoordinates,
  ISizes,
  INotification,
} from '../../../interfaces';

export interface IAuthStore {
  logging: ILoadingState;
}

export interface ICommonStore {
  featureFlags: { [key: string]: boolean };
  theme: ThemeMode;
}

export interface IUserStore {
  data: IUser | null;
  loading: ILoadingState;
}

export interface IUserCreatingStore {
  edit: ILoadingState;
  create: ILoadingState;
}

export interface IProfileStore {}

export interface INotifierStore {
  notifications: INotification[];
}

export interface IFloatingList {
  coords: ICoordinates;
  sizes: ISizes;
}

export interface IBoardStore {
  mode: 'table' | 'cards';
  dateRange: IDateRange;
  floatingList: IFloatingList;
}

export interface INotesStore {
  editId?: string;
  deleteId?: string;
  created?: boolean;
  createMode?: boolean;
}
