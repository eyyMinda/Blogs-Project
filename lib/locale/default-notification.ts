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
export default defaultNotification;
