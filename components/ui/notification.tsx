import css from "./styles/notification.module.css";
import { useContext } from "react";
import NotificationContext from "@/lib/context/notification-context";

function Notification({ title, message, status }: NotificationData) {
  const notifCtx = useContext(NotificationContext);
  const divCss = `${css.notification} ${css[status]}`;

  return (
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
    </div>
  );
}

export default Notification;
