import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authTransport } from '../../common/api';

import {
  ILoginByEmailRequestDto,
  ICreateUserRequestDto,
  IUser,
} from '../../../interfaces';
import { IUserStore } from '../../common/interfaces/IStore';

const initialState: IUserStore = {
  data: null,
  loading: {
    isLoading: false,
    error: false,
  },
  create: {
    isLoading: false,
    error: false,
  },
};

const loginByEmail = createAsyncThunk(
  'user/loginByEmail',
  (payload: ILoginByEmailRequestDto) => {
    return authTransport
      .loginByEmail(payload)
      .then(() => authTransport.userByToken());
  },
);

const userByToken = createAsyncThunk('user/userByToken', () => {
  return authTransport.userByToken();
});

const createUser = createAsyncThunk(
  'user/create',
  (payload: ICreateUserRequestDto, thunkApi) => {
    return authTransport
      .post<IUser, ICreateUserRequestDto>('/api/users/create', payload)
      .then(() => {
        thunkApi.dispatch(
          loginByEmail({
            email: payload.email,
            password: payload.password,
          }),
        );
      });
  },
);

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
      })

      .addCase(createUser.pending, (state) => {
        state.create.isLoading = true;
        state.create.error = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
        }

        state.create.isLoading = false;
        state.create.error = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.create.isLoading = false;
        state.create.error = false;
      });
  },
});

const clearUser = userSlice.actions.clearUser;

export { loginByEmail, userByToken, clearUser, createUser };
