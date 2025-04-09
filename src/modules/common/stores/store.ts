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

import { userSlice } from '../../board/stores/userSlice';
import { notesApi } from '../../board/api/notesApi';
import { commonSlice } from '../../board/stores/commonSlice';
import { boardSlice } from '../../board/stores/boardSlice';
import { hashTagsApi } from '../../board/api/hashTagsApi';
import { notifierSlice } from './notifierSlice';
import { authSlice } from '../../auth';
import { statisticsSlice } from '../../user';

const persistConfig = {
  key: 'user',
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  common: commonSlice.reducer,
  user: userSlice.reducer,
  board: boardSlice.reducer,
  notes: notesApi.reducer,
  hashtags: hashTagsApi.reducer,
  statistics: statisticsSlice.reducer,
  notifier: notifierSlice.reducer,
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
      .concat(hashTagsApi.middleware),
});
export const persistor = persistStore(store);

persistor.pause();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
