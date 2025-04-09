import { ThemeMode } from '../../../enums';
import {
  IUser,
  ILoadingState,
  IDateRange,
  ICoordinates,
  ISizes,
  INotification,
  IHashTag,
  INote,
} from '../../../interfaces';

export interface IAuthStore {
  logging: ILoadingState;
  creating: ILoadingState;
}

export interface ICommonStore {
  featureFlags: { [key: string]: boolean };
  theme: ThemeMode;
}

export interface IUserStore {
  data: IUser | null;
  loading: ILoadingState;
  editing: ILoadingState;
}

export interface IStatisticsStore {
  loading: ILoadingState;
  data: {
    notesCount?: number;
    top5HashTags?: {
      // Статистика хэштегов в формате {[Хэштег id]: Колличество упоминаний}
      [key: string]: {
        hashtag: IHashTag;
        count: number;
      };
    };
    hashTagsTop?: {
      [key: string]: {
        hashTag: IHashTag;
        notes: INote[];
        count: number;
      };
    };
    // Добавить 5 или больше, может сделать инфинити - скрол
    lastNotes?: INote[];
  };
}

export interface INotifierStore {
  notifications: INotification[];
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
  auth: IAuthStore;
  user: IUserStore;
  board: IBoardStore;
  common: ICommonStore;
}
