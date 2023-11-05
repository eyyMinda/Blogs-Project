import * as z from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(20, {
      message: "Name exceeds the character limit.",
    }),
  email: z
    .string()
    .min(8)
    .max(40, {
      message: "Email exceeds the character limit.",
    })
    .email(),
  message: z.string().min(5).max(1000, {
    message: "Message exceeds the character limit.",
  }),
});