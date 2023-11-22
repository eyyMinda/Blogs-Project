import { newRandUsername, hashPassword } from "../auth-valid/auth";

export const defaultUserImg = "/images/account/default-pic.webp";

export const createUser = async ({ email, password, image }: { email: string; password?: string | null; image?: string | null }) => {
  const date = new Date();
  const tempUsername = newRandUsername();

  const userObject: any = {
    email,
    name: tempUsername,
    image: image || defaultUserImg,
    emailVerified: null,
    createdAt: date,
    updatedAt: date
  };
  console.log("pass: ", password);
  if (password) {
    console.log("password if check: ", password);
    userObject.password = await hashPassword(password);
  }
  return userObject;
};
