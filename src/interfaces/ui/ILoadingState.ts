import { HttpStatus } from '../../modules/common/utils/authTransport/enums/HttpStatus';

export interface ILoadingState {
  status: 'idle' | 'loading' | 'succeed' | 'error';
  error?: {
    statusCode: HttpStatus;
    message: string;
  } | null;
}
