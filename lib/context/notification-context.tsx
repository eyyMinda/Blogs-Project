"use client";
import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  setNotification: () => {}
});

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<NotificationData | null>(null);

  // Check if status or error and set timer to remove the notification.
  useEffect(() => {
    const statuses = { success: 4000, error: 7000 };

    if (notification && notification.status in statuses) {
      const removeTimer = statuses[notification.status as keyof typeof statuses];
      const timer = setTimeout(() => setNotification(null), removeTimer);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const context = { notification, setNotification };
  return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>;
}

export default NotificationContext;
