import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { INotification } from '../../../interfaces';
import { INotifierStore } from '../api/interfaces/IStore';

const initialState: INotifierStore = {
  notifications: [],
};

export const notifierSlice = createSlice({
  name: 'notifier',
  initialState,
  reducers: (create) => ({
    startWork: create.reducer<INotification>((state, action) => {
      state.notifications = state.notifications.map((notification) => {
        if (notification.id === action.payload.id) {
          return action.payload;
        }

        return notification;
      });
    }),
    remove: create.reducer<string>((state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    }),
    showMessage: create.reducer<INotification>((state, action) => {
      state.notifications.push({ ...action.payload, id: uuid() });
    }),

    showSuccess: create.reducer<string>((state, action) => {
      state.notifications.push({
        id: uuid(),
        message: action.payload,
        status: 'success',
      });
    }),
    showError: create.reducer<string>((state, action) => {
      state.notifications.push({
        id: uuid(),
        message: action.payload,
        status: 'error',
      });
    }),
    showInfo: create.reducer<string>((state, action) => {
      state.notifications.push({
        id: uuid(),
        message: action.payload,
        status: 'info',
      });
    }),
    showWarning: create.reducer<string>((state, action) => {
      state.notifications.push({
        id: uuid(),
        message: action.payload,
        status: 'warning',
      });
    }),
  }),
});

export const {
  showError,
  showInfo,
  showSuccess,
  showWarning,
  showMessage,
  startWork,
  remove,
} = notifierSlice.actions;
