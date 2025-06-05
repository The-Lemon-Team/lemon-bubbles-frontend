import { authTransport } from '../utils/authTransport';

import { IUserService } from '../../../interfaces';

export const userService: IUserService = {
  editUser: (payload) => authTransport.patch('/api/users/edit', payload),
};
