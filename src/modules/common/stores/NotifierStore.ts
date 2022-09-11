import { types, getParent, Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { INotification } from '../../../interfaces/INotification';

const Notification = types
  .model('Notification', {
    workId: types.maybe(types.string),
    message: types.string,
    status: types.enumeration(['success', 'warning', 'error', 'info']),
  })
  .actions((self) => ({
    startWork(id: string) {
      self.workId = id;
    },
    remove() {
      getParent<typeof NotifierStore>(self, 2).remove(
        self as Instance<typeof Notification>,
      );
    },
  }));

export const NotifierStore = types
  .model('NotifierStore', {
    notifications: types.array(Notification),
  })
  .views((self) => ({
    get notInProgress() {
      return self.notifications.filter((notification) => !notification.workId);
    },
    get inProgress() {
      return self.notifications.filter((notification) => notification.workId);
    },
  }))
  .actions((self) => ({
    remove(notification: Instance<typeof Notification>) {
      self.notifications.splice(self.notifications.indexOf(notification), 1);
      // destroy(notification);
    },
    showMessage(message: Omit<INotification, 'workId'>) {
      self.notifications.push(message);
    },
  }))
  .actions((self) => ({
    showSuccess(message: string) {
      self.showMessage({ message, status: 'success' });
    },
    showError(message: string) {
      self.showMessage({ message, status: 'error' });
    },
    showInfo(message: string) {
      self.showMessage({ message, status: 'info' });
    },
    showWarning(message: string) {
      self.showMessage({ message, status: 'warning' });
    },
  }));

export const notifierStore = NotifierStore.create({ notifications: [] });

export type NotifierInstanse = Instance<typeof NotifierStore>;
export const NotifierStoreContext =
  createContext<NotifierInstanse>(notifierStore);

export const useNotifierStore = () => {
  return useContext(NotifierStoreContext);
};
