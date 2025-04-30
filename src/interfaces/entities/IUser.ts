import { IHashTag } from './IHashTag';
import { INote } from './INote';

export interface IUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface IProfileStatistics {
  notesCount?: number;
  top5HashTags?: {
    // Статистика хэштегов в формате {[Хэштег]: Колличество упоминаний}
    [key: string]: {
      hashtag: IHashTag;
      count: number;
    };
  };
}

export interface IEntireStatistics {
  hashTags: IHashTag[];
  lastNotes: INote[];
}

export interface IUserEditForm extends Omit<IUser, 'id'> {
  id?: string;
  password?: string;
  newPassword?: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginByEmailRequestDto {
  email: string;
  password: string;
}

export interface ILoginByNicknameRequestDto {
  username: string;
  password: string;
}

export interface ICreateUserRequestDto extends ILoginByNicknameRequestDto {
  email: string;
}

export interface ILoginForm extends ILoginByEmailRequestDto {}

export interface ISignUpForm extends ILoginForm {
  username: string;
  repeatedPassword: string;
}

export interface IUserService {
  editUser: (payload: IUserEditForm) => Promise<IUser>;
  loadProfileStatistics: () => Promise<IProfileStatistics>;
  loadEntireStatistics: () => Promise<IEntireStatistics>;
}
