import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authTransport } from '../../common/api';

import { ILoginByEmailRequestPayload } from '../../common/api';
import { IUserStore } from '../../common/api/interfaces/IStore';

const initialState: IUserStore = {
  data: null,
  loading: {
    isLoading: false,
    error: false,
  },
};

const loginByEmail = createAsyncThunk(
  'user/loginByEmail',
  (payload: ILoginByEmailRequestPayload) => {
    return authTransport
      .loginByEmail(payload)
      .then(() => authTransport.userByToken());
  },
);

const userByToken = createAsyncThunk('user/userByToken', () => {
  return authTransport.userByToken();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: () => {
    return {
      clearUser: (state) => {
        state.data = null;
      },
    };
  },
  extraReducers: (builder) => {
    builder
      .addCase(userByToken.pending, (state) => {
        state.loading.isLoading = true;
      })
      .addCase(userByToken.rejected, (state, action) => {
        state.loading.error = true;
        state.loading.isLoading = false;
      })
      .addCase(userByToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
        }

        state.loading.isLoading = false;
        state.loading.error = false;
      })
      .addCase(loginByEmail.pending, (state) => {
        state.loading.isLoading = true;
      })
      .addCase(loginByEmail.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
        }

        state.loading.isLoading = false;
        state.loading.error = false;
      })
      .addCase(loginByEmail.rejected, (state) => {
        state.loading.error = true;
        state.loading.isLoading = false;
      });
  },
});

const clearUser = userSlice.actions.clearUser;

export { loginByEmail, userByToken, clearUser };
