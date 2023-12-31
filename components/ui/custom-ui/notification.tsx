import { useContext } from "react";
import { createPortal } from "react-dom";
import NotificationContext from "Lib/context/notification-context";

import { X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "Components/ui/alert";
import { alertVariants, alertIcons } from "Lib/locale/default-notification";

function Notification({ title, message, status }: NotificationData) {
  const notifCtx = useContext(NotificationContext);
  const currVariant = alertVariants[status];
  const IconComponent = alertIcons[status];

  const targetElement = document.getElementById("notifications") ?? document.body;
  const target: Element | DocumentFragment = targetElement;

  return createPortal(
    <Alert
      variant={currVariant}
      className="alertComp fixed top-24 right-4 w-3/12 pointer-events-auto text-gray-200 bg-gray-800 dark:bg-white shadow dark:text-gray-600">
      <IconComponent className="h-8 w-8" />
      <div className="ml-2">
        <div className="flex items-end justify-between">
          <AlertTitle>{title}</AlertTitle>
          <X className="h-8 w-8 cursor-pointer" onClick={() => notifCtx.setNotification(null)} />
        </div>
        <AlertDescription>
          {Array.isArray(message) ? (
            <ul>
              {message.map((m, i) => (
                <li key={i}>
                  <p>{m}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>{message}</p>
          )}
        </AlertDescription>
      </div>
    </Alert>,
    target
  );
}

export default Notification;
