import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authTransport } from '../../common/api';

import {
  ILoginByEmailRequestDto,
  ICreateUserRequestDto,
  IUser,
} from '../../../interfaces';
import { IAuthStore } from '../../common/interfaces/IStore';

const initialState: IAuthStore = {
  logging: {
    status: 'idle',
  },
  creating: {
    status: 'idle',
  },
};

const loginByEmail = createAsyncThunk(
  'auth/loginByEmail',
  (payload: ILoginByEmailRequestDto) => {
    return authTransport.loginByEmail(payload);
  },
);

const createUser = createAsyncThunk(
  'auth/create',
  (payload: ICreateUserRequestDto, thunkApi) => {
    return authTransport
      .post<IUser, ICreateUserRequestDto>('/api/users/create', payload)
      .then(() =>
        thunkApi.dispatch(
          loginByEmail({ email: payload.email, password: payload.password }),
        ),
      );
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginByEmail.pending, (state) => {
        state.logging.status = 'loading';
      })
      .addCase(loginByEmail.fulfilled, (state, action) => {
        state.logging.status = 'succeed';
      })
      .addCase(loginByEmail.rejected, (state) => {
        state.logging.status = 'error';
      })
      .addCase(createUser.pending, (state) => {
        state.creating.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.creating.status = 'succeed';
      })
      .addCase(createUser.rejected, (state) => {
        state.creating.status = 'error';
      });
  },
});

export { loginByEmail, createUser };
