import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authTransport, IAuthStore } from '../../common';
import { ILoginByEmailRequestDto, IErrorMessage } from '../../../interfaces';

const initialState: IAuthStore = {
  logging: {
    status: 'idle',
    error: null,
  },
};

const loginByEmail = createAsyncThunk(
  'auth/loginByEmail',
  (payload: ILoginByEmailRequestDto) => {
    return authTransport.loginByEmail(payload).catch((error: AxiosError) => {
      throw error.response?.data;
    });
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
        state.logging.error = null;
      })
      .addCase(loginByEmail.fulfilled, (state) => {
        state.logging.status = 'succeed';
        state.logging.error = null;
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.logging.status = 'error';
        state.logging.error = action.error as IErrorMessage;
      });
  },
});

export { loginByEmail };
