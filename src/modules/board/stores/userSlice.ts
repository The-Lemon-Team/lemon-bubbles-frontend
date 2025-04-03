import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authTransport } from '../../common/api';

import { IUserStore } from '../../common/interfaces/IStore';

const initialState: IUserStore = {
  data: null,
  loading: {
    isLoading: false,
    error: false,
  },
};

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
        state.loading.error = false;
      })
      .addCase(userByToken.rejected, (state) => {
        state.loading.error = true;
        state.loading.isLoading = false;
      })
      .addCase(userByToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
        }

        state.loading.isLoading = false;
        state.loading.error = false;
      });
  },
});

const clearUser = userSlice.actions.clearUser;

export { userByToken, clearUser };
