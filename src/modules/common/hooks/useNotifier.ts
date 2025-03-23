import { useDispatch } from 'react-redux';

import { useAppSelector } from '../stores/hooks';
import {
  showError as showErrorAction,
  showInfo as showInfoAction,
  showMessage as showMessageAction,
  showSuccess as showSuccessAction,
  showWarning as showWarningAction,
  startWork as startWorkAction,
  remove as removeAction,
} from '../stores/notifierSlice';

import { INotification } from '../../../interfaces';

export const useNotifier = () => {
  const dispatch = useDispatch();
  const notifications = useAppSelector((state) => state.notifier.notifications);
  const notificationsInProgress = notifications.filter(
    (notification) => !!notification.workId,
  );
  const notificationsNotInProgress = notifications.filter(
    (notification) => !notification.workId,
  );

  const startWork = (notification: INotification, workId: string) => {
    dispatch(startWorkAction({ ...notification, workId }));
  };
  const removeToaster = (id: string) => {
    dispatch(removeAction(id));
  };
  const showError = (message: string) => {
    dispatch(showErrorAction(message));
  };
  const showInfo = (message: string) => {
    dispatch(showInfoAction(message));
  };
  const showMessage = (notification: INotification) => {
    dispatch(showMessageAction(notification));
  };
  const showSuccess = (message: string) => {
    dispatch(showSuccessAction(message));
  };
  const showWarning = (message: string) => {
    dispatch(showWarningAction(message));
  };

  return {
    notifications,
    notificationsInProgress,
    notificationsNotInProgress,

    startWork,
    showError,
    showInfo,
    showMessage,
    showSuccess,
    showWarning,
    removeToaster,
  };
};
