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
    isLoading: false,
    error: false,
  },
  creating: {
    isLoading: false,
    error: false,
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
        state.logging.isLoading = true;
      })
      .addCase(loginByEmail.fulfilled, (state, action) => {
        state.logging.isLoading = false;
        state.logging.error = false;
      })
      .addCase(loginByEmail.rejected, (state) => {
        state.logging.error = true;
        state.logging.isLoading = false;
      })
      .addCase(createUser.pending, (state) => {
        state.creating.isLoading = true;
        state.creating.error = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.creating.isLoading = false;
        state.creating.error = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.creating.isLoading = false;
        state.creating.error = false;
      });
  },
});

export { loginByEmail, createUser };
