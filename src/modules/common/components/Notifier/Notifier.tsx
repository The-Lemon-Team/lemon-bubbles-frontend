import { useEffect, useRef } from 'react';
import { Message, useToaster } from 'rsuite';

import { useNotifier } from '../../hooks/useNotifier';

import { INotification } from '../../../../interfaces';

const NOTIFICATION_DURATION = 3000;

interface INotificationProps
  extends Pick<INotification, 'message' | 'status'> {}

const Notification = ({ status, message }: INotificationProps) => {
  return (
    <Message showIcon type={status} duration={0}>
      {message}
    </Message>
  );
};

export const Notifier = () => {
  const toaster = useToaster();
  const {
    notificationsInProgress,
    notificationsNotInProgress,
    removeToaster,
    startWork,
  } = useNotifier();
  const timersMap = useRef(new Map());

  useEffect(() => {
    notificationsNotInProgress.forEach(async (notification) => {
      const toasterId = await toaster.push(
        <Notification
          status={notification.status as INotification['status']}
          message={notification.message}
        />,
        {
          placement: 'bottomCenter',
        },
      );

      toasterId && startWork(notification, toasterId);
    });

    notificationsInProgress.forEach(({ workId, id }) => {
      const alreadyInWork = timersMap.current.get(workId);
      if (!alreadyInWork) {
        const timeOutTimer = setTimeout(() => {
          workId && toaster.remove(workId);
          timersMap.current.delete(workId);
          removeToaster(id);
        }, NOTIFICATION_DURATION);

        timersMap.current.set(workId, timeOutTimer);
      }
    });
  }, [toaster, notificationsInProgress, notificationsNotInProgress]);

  return null;
};
