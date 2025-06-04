import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authTransport, IUserStore } from '../../common';

import { IUser } from '../../../interfaces';

const initialState: IUserStore = {
  data: null,
  loading: {
    status: 'idle',
  },
};

const userByToken = createAsyncThunk('user/userByToken', () => {
  return authTransport.userByToken();
});

export const userModelSlice = createSlice({
  name: 'user/model',
  initialState,
  reducers: (creator) => ({
    setUser: creator.reducer<IUser>((state, action) => {
      state.data = action.payload;
    }),
    clearUser: (state) => {
      state.data = null;
    },
  }),
  extraReducers: (builder) =>
    builder
      .addCase(userByToken.pending, (state) => {
        state.loading.status = 'loading';
      })
      .addCase(userByToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
        }
        state.loading.status = 'succeed';
      })
      .addCase(userByToken.rejected, (state) => {
        state.loading.status = 'error';
      }),
});

export const { setUser, clearUser } = userModelSlice.actions;
export { userByToken };
