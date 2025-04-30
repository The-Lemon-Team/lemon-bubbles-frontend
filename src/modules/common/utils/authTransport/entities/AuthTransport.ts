import { HttpStatus } from '../enums/HttpStatus';

import {
  IAuthTransport,
  IHttpTransport,
  IHttpTransportOptions,
  ITokensResponse,
} from '../interfaces';
import {
  ITokens,
  IUser,
  ILoginByNicknameRequestDto,
  ILoginByEmailRequestDto,
} from '../../../../../interfaces';

interface IAuthTransportOptions {
  httpTransport: IHttpTransport;
  window: Window;
  token?: string | null;
  refreshToken?: string | null;
}

const REFRESH_TOKEN_URL = '/api/auth/refreshToken';
// let tokenUpdating = false;

export class AuthTransport implements IAuthTransport {
  private token: string | null;
  private refreshToken: string | null;
  private window: Window;
  private onLogoutSubscribers: { (...args: any): void }[] = [];
  private onLoginSubscribers: { (...args: any): void }[] = [];
  private onRefreshTokenSubscribers: { (...args: any): void }[] = [];
  // private onAuthQueue = [] as Array<() => Promise<any>>;
  public client: IHttpTransport;

  constructor({
    httpTransport,
    refreshToken,
    token,
    window,
  }: IAuthTransportOptions) {
    this.client = httpTransport;
    this.window = window;

    this.token = token || null;
    this.refreshToken = refreshToken || null;

    this.onInit();
  }

  getToken(): ITokens {
    return {
      accessToken: this.token || '',
      refreshToken: this.refreshToken || '',
    };
  }

  onLogout(listener: () => void): () => void {
    this.onLogoutSubscribers.push(listener);

    return () =>
      this.onLogoutSubscribers.filter(
        (logoutListener) => logoutListener !== listener,
      );
  }

  onLogin(listener: () => void): () => void {
    this.onLoginSubscribers.push(listener);

    return () =>
      this.onLoginSubscribers.filter(
        (logoutListener) => logoutListener !== listener,
      );
  }

  onRefreshToken(listener: () => void): () => void {
    this.onRefreshTokenSubscribers.push(listener);

    return () =>
      this.onRefreshTokenSubscribers.filter(
        (logoutListener) => logoutListener !== listener,
      );
  }

  async userByToken() {
    return this.get<IUser>('/api/auth/userByToken').catch((e) => {
      this.logout();

      throw e;
    });
  }

  updateToken(refreshToken: string): Promise<ITokensResponse> {
    return this.client.post<ITokensResponse, { refreshToken: string }>(
      REFRESH_TOKEN_URL,
      {
        refreshToken,
      },
    );
  }

  async login({
    username,
    password,
  }: ILoginByNicknameRequestDto): Promise<ITokensResponse> {
    const response = await this.client.post<ITokensResponse>(
      '/api/auth/login',
      {
        username,
        password,
      },
    );

    const { accessToken, refreshToken } = response;
    if (accessToken && refreshToken) {
      this.setToken({
        refreshToken,
        accessToken,
      });
      this.onLoginSubscribers.forEach((subscriber) => subscriber());
    }

    return response;
  }

  async loginByEmail({ email, password }: ILoginByEmailRequestDto) {
    const response = await this.client.post('/api/auth/signInByEmail', {
      email,
      password,
    });

    const { accessToken, refreshToken } = response;

    if (accessToken && refreshToken) {
      this.setToken({
        refreshToken,
        accessToken,
      });

      this.onLoginSubscribers.forEach((subscriber) => subscriber());
    }

    return response;
  }

  logout = () => {
    this.clearToken();
    this.notifyLogoutSubcribers();
  };

  setTokens(tokens: ITokens | null) {
    this.setToken(
      tokens || {
        accessToken: '',
        refreshToken: '',
      },
    );
  }

  post<R = any, D = Record<string, any>>(
    url: string,
    data?: D,
    config?: IHttpTransportOptions,
  ): Promise<R> {
    return this.client.post<R, D>(url, data, config);
  }

  put<R = any, D = Record<string, any>>(
    url: string,
    data?: D,
    config?: IHttpTransportOptions,
  ): Promise<R> {
    return this.client.put<R, D>(url, data, config);
  }

  patch<R = any, D = Record<string, any>>(
    url: string,
    data?: D,
    config?: IHttpTransportOptions,
  ): Promise<R> {
    return this.client.patch<R, D>(url, data, config);
  }

  get<R = any>(url: string, config?: IHttpTransportOptions): Promise<R> {
    return this.client.get<R>(url, config);
  }

  delete<R = any>(url: string, config?: IHttpTransportOptions): Promise<R> {
    return this.client.delete(url, config);
  }

  private getAuthorizationHeader(): string {
    return `Bearer ${this.token}`;
  }

  private onInit(): void {
    this.addAuthRequestMiddleware();
    this.addAuthResponseMiddleware();

    try {
      const tokens = localStorage.getItem('tokens');

      if (tokens) {
        const tokensObj = JSON.parse(tokens);

        this.setTokens(tokensObj);
      }
    } catch (e) {
      console.error(e);
    }
  }

  private addAuthRequestMiddleware(): void {
    this.client.requestMiddleware(
      (config = {}) => {
        if (!this.token) {
          return config;
        }

        return this.subscribeConfig(config);
      },
      (e) => Promise.reject(e),
    );
  }

  private addAuthResponseMiddleware(): void {
    this.client.responseMiddleware(
      (r) => r,
      async (error) => {
        if (
          !this.refreshToken ||
          error.response?.status !== HttpStatus.UNAUTHORIZED ||
          error.config?.retry
        ) {
          throw error;
        }

        try {
          const { refreshToken, accessToken } = await this.updateToken(
            this.refreshToken,
          );
          this.setToken({ refreshToken, accessToken });
        } catch (e) {
          this.setToken();
        }

        const newRequest = {
          ...error.config,
          retry: true,
        };

        return this.client.makeRequest(newRequest);
      },
    );
  }

  private notifyLogoutSubcribers() {
    this.onLogoutSubscribers.forEach((subscriber) => subscriber());
  }

  private subscribeConfig(
    config?: IHttpTransportOptions,
  ): IHttpTransportOptions {
    const newConfig = config || { headers: {} };

    return {
      ...newConfig,
      headers: {
        ...newConfig.headers,
        Authorization: this.getAuthorizationHeader(),
      },
    };
  }

  private clearToken(): void {
    this.token = null;
    this.refreshToken = null;

    localStorage.removeItem('tokens');
    this.onRefreshTokenSubscribers.forEach((subscriber) => subscriber());
  }

  private setToken(
    { accessToken, refreshToken }: ITokens = {
      accessToken: '',
      refreshToken: '',
    },
  ): void {
    this.token = accessToken;
    this.refreshToken = refreshToken;

    localStorage.setItem(
      'tokens',
      JSON.stringify({
        accessToken,
        refreshToken,
      }),
    );
  }
}
