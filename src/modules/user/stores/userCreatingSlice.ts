import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authTransport, userService, IUserCreatingStore } from '../../common';

import {
  ICreateUserRequestDto,
  IUser,
  IUserEditForm,
} from '../../../interfaces';

const initialState: IUserCreatingStore = {
  edit: {
    status: 'idle',
  },
  create: {
    status: 'idle',
  },
};

const editUser = createAsyncThunk(
  'user/creating/edit',
  (payload: IUserEditForm) => {
    return userService.editUser(payload);
  },
);

const createUser = createAsyncThunk(
  'user/creating/create',
  (payload: ICreateUserRequestDto) => {
    return authTransport.post<IUser, ICreateUserRequestDto>(
      '/api/users/create',
      payload,
    );
  },
);

export const userCreatingSlice = createSlice({
  name: 'user/creating',
  initialState,
  reducers: () => ({}),
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.create.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state) => {
        state.create.status = 'succeed';
      })
      .addCase(createUser.rejected, (state) => {
        state.create.status = 'error';
      })

      .addCase(editUser.pending, (state) => {
        state.edit.status = 'loading';
      })
      .addCase(editUser.rejected, (state) => {
        state.edit.status = 'error';
      })
      .addCase(editUser.fulfilled, (state) => {
        state.edit.status = 'succeed';
      });
  },
});

export { editUser, createUser };
