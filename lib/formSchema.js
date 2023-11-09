import * as z from "zod";

export const contactFormSchema = z.object({
  username: z.string()
    .min(4, { message: "Name must be at least 2 characters." })
    .max(24, { message: "Name exceeds the character limit." }),
  email: z.string()
    .min(10, { message: "Email must be at least 10 characters." })
    .max(40, { message: "Email exceeds the character limit." })
    .email(),
  message: z.string()
    .min(12, { message: "Should write a more informative message." })
    .max(1000, { message: "Message exceeds the character limit." }),
});