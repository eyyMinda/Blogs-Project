"use client";
import { createContext, useEffect, useState } from "react";
import { NOTIFICATION_ERROR_TIMER, NOTIFICATION_SPECIAL_TIMER, NOTIFICATION_SUCCESS_TIMER } from "../constants";

const statusTimers = { success: NOTIFICATION_SUCCESS_TIMER, error: NOTIFICATION_ERROR_TIMER, special: NOTIFICATION_SPECIAL_TIMER };

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
