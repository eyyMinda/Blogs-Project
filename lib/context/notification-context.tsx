"use client";
import { createContext, useEffect, useState } from "react";

const statusTimers = { success: 4000, error: 7000 };

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  setNotification: () => {}
});

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<NotificationData | null>(null);

  // Check if status or error and set timer to remove the notification.
  useEffect(() => {
    if (notification && notification.status in statusTimers) {
      const removeTimer = statusTimers[notification.status as keyof typeof statusTimers];
      const timer = setTimeout(() => setNotification(null), removeTimer);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const context = { notification, setNotification };
  return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>;
}

export default NotificationContext;
