type NotificationContextType = {
  notification: NotificationData | null;
  setNotification: React.Dispatch<React.SetStateAction<NotificationData | null>>;
  // timers: NotificationTimers;
};

type NotificationStatus = "error" | "success" | "pending";

type NotificationData = {
  title: string;
  message: string[] | string | null;
  status: NotificationStatus;
};

interface NotificationLocale {
  error: (msg: string[] | string | null) => NotificationData;
  success: (msg: string[] | string | null) => NotificationData;
  pending: NotificationData;
}
interface DefaultNotification {
  [key: string]: NotificationLocale;
}

type NotificationTimers = {
  [key: string]: number;
};
type NotificationAlertVariants = {
  [key: string]: "success" | "destructive" | "pending";
};
