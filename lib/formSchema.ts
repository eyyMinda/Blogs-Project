import * as z from "zod";

const REUSED = {
  email: z
    .string()
    .min(1, { message: "Enter an email." })
    .min(10, { message: "Email must be at least 10 characters." })
    .max(40, { message: "Email exceeds the character limit." })
    .email(),
  username: z
    .string()
    .trim()
    .min(1, { message: "Enter the username." })
    .min(4, { message: "Username must be at least 4 characters long." })
    .max(24, { message: "Username exceeds the character limit." }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Enter a password." })
    .min(8, { message: "Password is too short." })
    .max(84, { message: "Password is too long." })
};

// ========================== CONTACT =======================================

const coreContactSchema = {
  subject: z
    .string()
    .min(1, { message: "Enter the subject." })
    .min(2, { message: "Subject must be at least 2 characters." })
    .max(200, { message: "Subject exceeds the character limit." }),
  message: z
    .string()
    .min(1, { message: "Enter the message." })
    .min(12, { message: "Should write a more informative message." })
    .max(1000, { message: "Message exceeds the character limit." })
};
const coreContactDefaults = { subject: "", message: "" };

export const contactFormSchema = (auth: boolean) => [
  z.object(
    auth
      ? coreContactSchema
      : {
          username: REUSED.username,
          email: REUSED.email,
          ...coreContactSchema
        }
  ),
  auth ? coreContactDefaults : { ...coreContactDefaults, username: "", email: "" }
];

// =========================== AUTH ======================================

const coreAuthSchema = {
  email: REUSED.email,
  password: REUSED.password
};

export const authFormSchema = (auth: "register" | "login") =>
  ({
    login: z.object(coreAuthSchema),
    register: z
      .object({ ...coreAuthSchema, passwordConfirm: z.string().trim().min(1, { message: "Enter a matching password." }) })
      .refine(data => data.password === data.passwordConfirm, { message: "Passwords do not match.", path: ["passwordConfirm"] })
  }[auth]);

// =========================== CHANGE PASS ======================================

const coreChangePassSchema = {
  passwordNew: REUSED.password,
  passwordConfirm: z.string().trim().min(1, { message: "Enter a matching password." })
};

export const changePassFormSchema = (needPassword: boolean) => {
  const zObject = needPassword
    ? z.object(coreChangePassSchema)
    : z.object({ ...coreChangePassSchema, passwordOld: z.string().trim().min(1, { message: "Enter old password." }) });

  return zObject.refine(data => data.passwordNew === data.passwordConfirm, { message: "Passwords do not match.", path: ["passwordConfirm"] });
};

// ============================ CHANGE USERNAME =====================================

export const changeUsernameSchema = z.object({ username: REUSED.username });
