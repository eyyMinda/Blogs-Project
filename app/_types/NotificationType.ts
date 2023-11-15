type NotificationContextType = {
  notification: NotificationData | null;
  setNotification: React.Dispatch<React.SetStateAction<NotificationData | null>>;
  // timers: NotificationTimers;
};

type NotificationData = {
  title: string;
  message: string[] | string;
  status: string;
};
type NotificationTimers = {
  [key: string]: number;
};
type NotificationAlertVariants = {
  [key: string]: "success" | "destructive" | "pending";
};
