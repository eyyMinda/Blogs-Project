import { AlertCircle, ChevronDownSquare, CircleDashed, LucideIcon } from "lucide-react";
type NotificationAlertIcons = {
  [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
};

const generateNotification = (
  successMessage: string,
  customPendingTitle?: string,
  customPendingMessage?: string,
  defaultErrorMessage?: string
): NotificationLocale => ({
  error: msg => ({
    title: "Failed!",
    message: msg || defaultErrorMessage || "Something went wrong!",
    status: "error"
  }),
  success: msg => ({
    title: "Success!",
    message: msg || successMessage,
    status: "success"
  }),
  pending: {
    title: customPendingTitle || `Processing...`,
    message: customPendingMessage || `Processing...`,
    status: "pending"
  }
});

/** The `defaultNotification` constant is an object that contains different notification messages for
 * various operations such as sending a message, registering, logging in, changing password, changing
 * username, changing avatar, and deleting an account. Each operation has three possible statuses:
 * success, error, and pending.
 */
const defaultNotification: DefaultNotification = {
  message: generateNotification("Successfully sent a Message!", "Sending...", "Sending your message..."),
  register: generateNotification("Successfully Registered!", "Registering...", "Singing you up..."),
  login: generateNotification("Successfully Logged in!", "Logging in...", "Signing you in..."),
  changepass: generateNotification("Password changed!", "Changing...", "Changing your password..."),
  changeusername: generateNotification("Username changed!", "Changing...", "Changing your username..."),
  changeavatar: generateNotification("Avatar changed!", "Changing...", "Changing your avatar..."),
  deleteacc: generateNotification("Account deleted!", "Deleting...", "Deleting your account...", "Failed to Delete your account.")
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
