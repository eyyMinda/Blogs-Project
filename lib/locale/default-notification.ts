import { AlertCircle, ChevronDownSquare, CircleDashed, LucideIcon } from "lucide-react";
type NotificationAlertIcons = {
  [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
};

const defaultNotification = {
  error: (msg: string[] | string) => ({
    title: "Failed!",
    message: msg || "Something went wrong!",
    status: "error"
  }),
  success: (msg: string[] | string) => ({
    title: "Success!",
    message: msg || "Successfully sent a message!",
    status: "success"
  }),
  pending: {
    title: "Signing up...",
    message: "Sending the message...",
    status: "pending"
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
