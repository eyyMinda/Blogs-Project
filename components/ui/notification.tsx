import ReactDOM from "react-dom";

import css from "./notification.module.css";

function Notification({ title, message, status }: { title: string; message: string[] | string; status: string }) {
  const divCss = `${css.notification} ${css[status]}`;

  return (
    <div className={divCss}>
      <h2>{title}</h2>
      {message && Array.isArray(message) ? (
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
