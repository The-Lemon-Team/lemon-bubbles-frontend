import { useEffect, useRef } from 'react';
import { Message, useToaster } from 'rsuite';
import { observer } from 'mobx-react-lite';

import { useNotifierStore } from '../../stores';

import { INotification } from '../../../../interfaces/INotification';

const NOTIFICATION_DURATION = 3000;

const Notification = ({ status, message }: INotification) => {
  return (
    <Message showIcon type={status} duration={0}>
      {message}
    </Message>
  );
};

export const Notifier = observer(() => {
  const toaster = useToaster();
  const notifierStore = useNotifierStore();
  const timersMap = useRef(new Map());

  useEffect(() => {
    notifierStore.notInProgress.forEach(({ status, message, startWork }) => {
      const toasterId = toaster.push(
        <Notification
          status={status as INotification['status']}
          message={message}
        />,
        {
          placement: 'topCenter',
        },
      );

      toasterId && startWork(toasterId);
    });

    notifierStore.inProgress.forEach(({ workId, remove }) => {
      const alreadyInWork = timersMap.current.get(workId);
      if (!alreadyInWork) {
        const timeOutTimer = setTimeout(() => {
          workId && toaster.remove(workId);
          timersMap.current.delete(workId);
          remove();
        }, NOTIFICATION_DURATION);

        timersMap.current.set(workId, timeOutTimer);
      }
    });
  }, [toaster, notifierStore.notInProgress, notifierStore.inProgress]);

  return null;
});
