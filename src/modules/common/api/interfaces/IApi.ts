import { IAuthTransport } from './IAuthTransport';
import { INotesService } from '../../../notes/interfaces';

export interface IApi {
  authTransport: IAuthTransport;
  notesService: INotesService;
}
