export interface INotification {
  id: string;
  workId?: string;
  message: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export type INotificationInProgress = INotification & { id: string };
