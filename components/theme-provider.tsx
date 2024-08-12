"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useContext } from "react";
import NotificationContext from "@/contexts/notification-context";
import Notification from "./ui/custom-ui/notification";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const notifCtx = useContext(NotificationContext);
  const notif = notifCtx?.notification;
  return (
    <NextThemesProvider {...props}>
      {children}
      {notif && <Notification title={notif.title} message={notif.message} status={notif.status} />}
    </NextThemesProvider>
  );
}
