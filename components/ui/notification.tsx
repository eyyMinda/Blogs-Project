import css from "./styles/notification.module.css";
import { useContext } from "react";
import NotificationContext from "@/lib/context/notification-context";
import ReactDOM from "react-dom";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Notification({ title, message, status }: NotificationData) {
  const notifCtx = useContext(NotificationContext);
  const divCss = `${css.notification} ${css[status]}`;

  const targetElement = document.getElementById("notifications") ?? document.body;
  const target: Element | DocumentFragment = targetElement;

  return ReactDOM.createPortal(
    <div className={divCss} onClick={() => notifCtx.setNotification(null)}>
      <h2>{title}</h2>

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
    </div>,
    // (<Alert variant="success" onClick={() => notifCtx.setNotification(null)}>
    //   <AlertCircle className="h-4 w-4" />
    //   <AlertTitle>{title}</AlertTitle>
    //   <AlertDescription>
    //     {Array.isArray(message) ? (
    //       <ul>
    //         {message.map((m, i) => (
    //           <li key={i}>
    //             <p>{m}</p>
    //           </li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p>{message}</p>
    //     )}
    //   </AlertDescription>
    // </Alert>)
    target
  );
}

export default Notification;
