import * as z from "zod";

export const contactFormSchema = z.object({
  username: z.string().min(4, { message: "Name must be at least 2 characters." }).max(24, { message: "Name exceeds the character limit." }),
  email: z.string().min(10, { message: "Email must be at least 10 characters." }).max(40, { message: "Email exceeds the character limit." }).email(),
  message: z.string().min(12, { message: "Should write a more informative message." }).max(1000, { message: "Message exceeds the character limit." })
});

const coreAuthSchema = {
  email: z
    .string()
    .min(1, { message: "Enter an email." })
    .min(10, { message: "Email must be at least 10 characters." })
    .max(40, { message: "Email exceeds the character limit." })
    .email(),
  password: z
    .string()
    .trim()
    .min(1, { message: "Enter a password." })
    .min(8, { message: "Password is too short." })
    .max(84, { message: "Password is too long." })
};

export const authFormSchema = (auth: "register" | "login") =>
  ({
    login: z.object(coreAuthSchema),
    register: z
      .object({ ...coreAuthSchema, passwordConfirm: z.string().trim().min(1, { message: "Enter a matching password." }) })
      .refine(data => data.password === data.passwordConfirm, { message: "Passwords do not match.", path: ["passwordConfirm"] })
  }[auth]);

export const changePassFormSchema = z.object({
  oldpassword: z
    .string()
    .trim()
    .min(1, { message: "Enter old password." })
    .min(8, { message: "Old password is too short." })
    .max(84, { message: "Old password is too long." }),
  newpassword: z
    .string()
    .trim()
    .min(1, { message: "Enter new password." })
    .min(8, { message: "New password is too short." })
    .max(84, { message: "New password is too long." })
});
