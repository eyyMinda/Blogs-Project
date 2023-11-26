import { newRandUsername, hashPassword } from "../auth-valid/auth";

export const defaultUserImg = "/images/account/default-pic.webp";

interface newUserProps {
  email: string;
  password?: string | null;
  image?: string | null;
  provider?: "github" | "credentials";
}

export const createUser = async ({ email, password, image, provider = "credentials" }: newUserProps) => {
  const date = new Date();
  const tempUsername = newRandUsername();

  const userObject: any = {
    email,
    name: tempUsername,
    image: image || defaultUserImg,
    emailVerified: null,
    createdAt: date.toString(),
    provider,
    updatedAt: date
  };
  if (password) userObject.password = await hashPassword(password);
  return userObject;
};
