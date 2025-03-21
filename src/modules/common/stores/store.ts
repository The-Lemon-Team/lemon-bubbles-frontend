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

const persistConfig = {
  key: 'user',
  storage,
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  notes: notesApi.reducer,
  common: commonSlice.reducer,
  board: boardSlice.reducer,
  hashtags: hashTagsApi.reducer,
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
