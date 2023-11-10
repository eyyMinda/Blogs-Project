import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  setNotification: () => {}
});

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<NotificationData | null>(null);

  useEffect(() => {
    const statuses = ["success", "error"];
    if (notification && statuses.includes(notification.status)) {
      const timer = setTimeout(() => setNotification(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const context = { notification, setNotification };

  return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>;
}

export default NotificationContext;
