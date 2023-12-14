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
      message: "Signing you up...",
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
      message: msg || "Successfully Logged in!",
      status: "success"
    }),
    pending: {
      title: "Logging in...",
      message: "Logging you in...",
      status: "pending"
    }
  },
  changepass: {
    error: msg => ({
      title: "Failed!",
      message: msg || "Something went wrong!",
      status: "error"
    }),
    success: msg => ({
      title: "Success!",
      message: msg || "Password changed!",
      status: "success"
    }),
    pending: {
      title: "Changing...",
      message: "Changing your password...",
      status: "pending"
    }
  },
  changeusername: {
    error: msg => ({
      title: "Failed!",
      message: msg || "Something went wrong!",
      status: "error"
    }),
    success: msg => ({
      title: "Success!",
      message: msg || "Username changed!",
      status: "success"
    }),
    pending: {
      title: "Changing...",
      message: "Changing your username...",
      status: "pending"
    }
  },
  changeavatar: {
    error: msg => ({
      title: "Failed!",
      message: msg || "Something went wrong!",
      status: "error"
    }),
    success: msg => ({
      title: "Success!",
      message: msg || "Avatar changed!",
      status: "success"
    }),
    pending: {
      title: "Changing...",
      message: "Changing your avatar...",
      status: "pending"
    }
  },
  deleteacc: {
    error: msg => ({
      title: "Failed!",
      message: msg || "Failed to Delete your account.",
      status: "error"
    }),
    success: msg => ({
      title: "Success!",
      message: msg || "Password changed!",
      status: "success"
    }),
    pending: {
      title: "Deleting...",
      message: "Deleting your account...",
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
