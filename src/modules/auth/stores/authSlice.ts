import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import { authTransport } from '../../common';
import { authTransport } from '../../common/utils/authTransport';

import { ILoginByEmailRequestDto } from '../../../interfaces';
import { IAuthStore } from '../../common/interfaces/IStore';

const initialState: IAuthStore = {
  logging: {
    status: 'idle',
  },
};

const loginByEmail = createAsyncThunk(
  'auth/loginByEmail',
  (payload: ILoginByEmailRequestDto) => {
    // @todo реализовать получение юзера после логина
    return authTransport.loginByEmail(payload);
    // .then((payload) => {
    // thunkApi.dispatch(userByToken(payload));
    // });
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
      .addCase(loginByEmail.fulfilled, (state) => {
        state.logging.status = 'succeed';
      })
      .addCase(loginByEmail.rejected, (state) => {
        state.logging.status = 'error';
      });
  },
});

export { loginByEmail };
