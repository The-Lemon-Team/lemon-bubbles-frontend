import { authTransport } from '../authTransport';
import { notesService } from '../../../notes/servies';

import { IApi } from '../interfaces';

export function useApi(): IApi {
  return { authTransport, notesService };
}
