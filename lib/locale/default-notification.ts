import { AlertCircle, ChevronDownSquare, CircleDashed, LucideIcon } from "lucide-react";
type NotificationAlertIcons = {
  [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
};

const defaultNotification: DefaultNotification = {
  message: {
    error: msg => ({
      title: "Failed!",
      message: msg || "Something went wrong!",
      status: "error"
    }),
    success: msg => ({
      title: "Success!",
      message: msg || "Successfully sent a message!",
      status: "success"
    }),
    pending: {
      title: "Sending...",
      message: "Sending the message...",
      status: "pending"
    }
  },
  register: {
    error: msg => ({
      title: "Failed!",
      message: msg || "Something went wrong!",
      status: "error"
    }),
    success: msg => ({
      title: "Success!",
      message: msg || "Successfully registered!",
      status: "success"
    }),
    pending: {
      title: "Registering...",
      message: "Registering the user...",
      status: "pending"
    }
  },
  login: {
    error: msg => ({
      title: "Failed!",
      message: msg || "Something went wrong!",
      status: "error"
    }),
    success: msg => ({
      title: "Success!",
      message: msg || "Successfully Loged in!",
      status: "success"
    }),
    pending: {
      title: "Loging in...",
      message: "Loging in the user...",
      status: "pending"
    }
  }
};

export const alertVariants: NotificationAlertVariants = {
  success: "success",
  error: "destructive",
  pending: "pending"
};
export const alertIcons: NotificationAlertIcons = {
  success: ChevronDownSquare,
  error: AlertCircle,
  pending: CircleDashed
};

export default defaultNotification;
