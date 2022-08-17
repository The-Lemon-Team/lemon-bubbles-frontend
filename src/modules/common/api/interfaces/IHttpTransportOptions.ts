export interface IHttpTransportOptions {
  headers?: {
    [key: string]: any;
    Authorization?: string;
  };
  [key: string]: any;
}
