import { newRandUsername, hashPassword } from "../auth-valid/auth";

export const createUser = async (email: string, password?: string | null, image?: string) => {
  const date = new Date();
  const tempUsername = newRandUsername();

  const userObject: any = {
    email,
    name: tempUsername,
    image: image || "/images/account/default-pic.webp",
    emailVerified: null,
    createdAt: date,
    updatedAt: date
  };

  if (password) userObject.password = await hashPassword(password);
  return userObject;
};
