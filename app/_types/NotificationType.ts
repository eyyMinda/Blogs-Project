type NotificationContextType = {
  notification: NotificationData | null;
  setNotification: React.Dispatch<React.SetStateAction<NotificationData | null>>;
};

type NotificationData = {
  title: string;
  message: string[] | string;
  status: string;
};
