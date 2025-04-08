import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authTransport } from '../../common/api';
import { userService } from '../../common/services';

import { IUserStore } from '../../common/interfaces/IStore';
import { IUserEditForm } from '../../../interfaces';

const initialState: IUserStore = {
  data: null,
  loading: {
    isLoading: false,
    error: false,
  },
  editing: {
    isLoading: false,
    error: false,
  },
};

const userByToken = createAsyncThunk('user/userByToken', () => {
  return authTransport.userByToken();
});

const editUser = createAsyncThunk('user/edit', (payload: IUserEditForm) => {
  return userService.editUser(payload);
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
      })
      .addCase(editUser.pending, (state) => {
        state.editing.isLoading = true;
        state.editing.error = false;
      })
      .addCase(editUser.rejected, (state) => {
        state.editing.error = true;
        state.editing.isLoading = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
        }

        state.editing.isLoading = false;
        state.editing.error = false;
      });
  },
});

const clearUser = userSlice.actions.clearUser;

export { userByToken, clearUser };
