import { AuthTransport, HttpTransport } from './entities';

export const authTransport = new AuthTransport({
  httpTransport: new HttpTransport(),
  window,
});
