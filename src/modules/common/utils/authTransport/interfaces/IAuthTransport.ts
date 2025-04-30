import {
  ITokens,
  IUser,
  ILoginByNicknameRequestDto,
} from '../../../../../interfaces';
import { IHttpTransportOptions } from './IHttpTransportOptions';
import { ITokensResponse } from './ITokenResponse';

type TDataRequest = Record<string, any>;

export interface IAuthTransport {
  login(payload: ILoginByNicknameRequestDto): Promise<ITokensResponse>;
  logout(): void;
  updateToken(refreshToken: string): Promise<ITokensResponse>;
  getToken(): ITokens;
  userByToken(): Promise<IUser>;
  onLogout(listener: () => void): () => void;
  onRefreshToken(listener: () => void): () => void;
  setTokens(tokens: ITokens): void;

  delete<R = any>(url: string, config?: IHttpTransportOptions): Promise<R>;

  get<R = any>(url: string, config?: IHttpTransportOptions): Promise<R>;

  post<R = any, D = TDataRequest>(
    url: string,
    data?: D,
    config?: IHttpTransportOptions,
  ): Promise<R>;

  put<R = any, D = TDataRequest>(
    url: string,
    data?: D,
    config?: IHttpTransportOptions,
  ): Promise<R>;

  patch<R = any, D = TDataRequest>(
    url: string,
    data?: D,
    config?: IHttpTransportOptions,
  ): Promise<R>;
}
