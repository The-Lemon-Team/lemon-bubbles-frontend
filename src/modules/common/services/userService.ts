import { authTransport } from '../api';

import { IUserService } from '../../../interfaces';

export const userService: IUserService = {
  editUser: (payload) => authTransport.patch('/user/edit', payload),
  loadProfileStatistics: () => authTransport.get(`/user/profileStatistics`),
  loadEntireStatistics: () => authTransport.get('/user/loadEntireStatistics'),
};
