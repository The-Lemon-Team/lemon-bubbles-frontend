import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { userReducer } from '../../user';
import { notesApi, notesSlice } from '../../notes';
import { boardSlice } from '../../board';
import { authSlice } from '../../auth';
import { profileSlice, profileApi } from '../../profile';
import { commonSlice } from './commonSlice';

import { hashTagsApi } from '../../hashTags/api/hashTagsApi';
import { notifierSlice } from './notifierSlice';

const persistConfig = {
  key: 'user',
  storage,
};

const rootReducer = combineReducers({
  common: commonSlice.reducer,
  auth: authSlice.reducer,
  notifier: notifierSlice.reducer,

  user: userReducer,
  profile: profileSlice.reducer,
  [profileApi.reducerPath]: profileApi.reducer,

  notes: notesSlice.reducer,
  [notesApi.reducerPath]: notesApi.reducer,

  board: boardSlice.reducer,
  hashTags: hashTagsApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(notesApi.middleware)
      .concat(hashTagsApi.middleware)
      .concat(profileApi.middleware),
});
export const persistor = persistStore(store);

persistor.pause();

export type IStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
